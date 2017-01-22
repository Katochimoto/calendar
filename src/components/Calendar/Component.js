import { Component as ReactComponent } from 'react';
import Store from './Store';

export default class Component extends ReactComponent {
  constructor (props) {
    super(props);
    this.state = this.transformState(Store.getState());
  }

  componentDidMount () {
    Store.addChangeListener(this.handleChangeStore, this);
  }

  componentWillUnmount () {
    Store.removeChangeListener(this.handleChangeStore, this);
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

    const state = this.transformState(Store.getState(), this.state);

    if (!this.shouldComponentUpdate(this.props, state)) {
      this._lockSetState = false;
      return;
    }

    this._lockSetState = true;
    this.setState(state);
  }
}
