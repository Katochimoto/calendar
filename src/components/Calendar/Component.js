import { Component as ReactComponent } from 'react';
import Store from './Store';

export default class Component extends ReactComponent {
  constructor (props) {
    super(props);
    this.state = this.transformState(Store.getState());
  }

  componentWillReceiveProps () {}

  componentDidMount () {
    Store.addChangeListener(onChangeState, this);
  }

  componentWillUnmount () {
    Store.removeChangeListener(onChangeState, this);
  }

  transformState (newState) {
    return newState;
  }
}

function onChangeState () {
  if (this._lockUpdateState) {
    this._shouldUpdateState = true;
    return;
  }

  this._lockUpdateState = true;
  this._shouldUpdateState = false;

  this.setState(this.transformState(Store.getState(), this.state), () => {
    this._lockUpdateState = false;
    if (this._shouldUpdateState) {
      onChangeState.call(this);
    }
  });
}
