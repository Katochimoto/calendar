import { Component as ReactComponent, PropTypes } from 'react';
import Datetime from './Datetime';
import Events from './Events';
import Store from './Store';

export { PropTypes };

export class Component extends ReactComponent {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidUpdate () {
    this._lockSetState = false;

    if (this._shouldUpdateState) {
      this.handleChange();
    }
  }

  transformState (/* props, context */) {
    return {};
  }

  handleChange () {
    if (this._lockSetState) {
      this._shouldUpdateState = true;
      return;
    }

    this._shouldUpdateState = false;

    const state = this.transformState(this.props, this.context);

    if (this.shouldComponentUpdate(this.props, state)) {
      this._lockSetState = true;
      this.setState(state);

    } else {
      this._lockSetState = false;
    }
  }
}

Component.contextTypes = {
  datetime: PropTypes.instanceOf(Datetime),
  events: PropTypes.instanceOf(Events),
  store: PropTypes.instanceOf(Store)
};

export class StoreComponent extends Component {
  componentDidMount () {
    this.context.store.addListener(this.handleChange, this);
  }

  componentWillUnmount () {
    this.context.store.removeListener(this.handleChange, this);
  }
}

export class EventsComponent extends Component {
  componentDidMount () {
    this.context.events.addListener(this.handleChange, this);
  }

  componentWillUnmount () {
    this.context.events.removeListener(this.handleChange, this);
  }
}
