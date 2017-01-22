import { Component as ReactComponent } from 'react';
import Store from './Store';

export default class Component extends ReactComponent {
  constructor (props) {
    super(props);
    this.state = this.transformState(Store.getState());
  }

  componentWillReceiveProps () {}

  componentDidMount () {
    Store.addChangeListener(this.handleChangeStore, this);
  }

  componentWillUnmount () {
    Store.removeChangeListener(this.handleChangeStore, this);
  }

  transformState (newState) {
    return newState;
  }

  handleChangeStore () {
    if (this._lockSetState) {
      this._shouldUpdateState = true;
      return;
    }

    this._lockSetState = true;
    this._shouldUpdateState = false;

    const state = this.transformState(Store.getState(), this.state);
    this.setState(state, () => {
      this._lockSetState = false;
      if (this._shouldUpdateState) {
        this.handleChangeStore();
      }
    });
  }
}
