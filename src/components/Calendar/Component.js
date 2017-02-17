import { Component as ReactComponent, PropTypes } from 'react';
import Store from './Store';
import Datetime from './Datetime';

export { PropTypes };

export class Component extends ReactComponent {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(context.store.getState());
  }

  componentDidMount () {
    this.context.store.addChangeListener(this.handleChangeStore, this);
  }

  componentWillUnmount () {
    this.context.store.removeChangeListener(this.handleChangeStore, this);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidUpdate () {
    this._lockSetState = false;

    if (this._shouldUpdateState) {
      this.handleChangeStore();
    }
  }

  transformState () {
    return {};
  }

  handleChangeStore () {
    if (this._lockSetState) {
      this._shouldUpdateState = true;
      return;
    }

    this._shouldUpdateState = false;

    const state = this.transformState(this.context.store.getState(), this.state);

    if (this.shouldComponentUpdate(this.props, state)) {
      this._lockSetState = true;
      this.setState(state);

    } else {
      this._lockSetState = false;
    }
  }
}

Component.contextTypes = {
  store: PropTypes.instanceOf(Store),
  datetime: PropTypes.instanceOf(Datetime)
};
