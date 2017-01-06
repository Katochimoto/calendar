import { PureComponent } from 'react';
import raf from 'raf';
import Store from './Store';

export default class Component extends PureComponent {
  constructor (props) {
    super(props);
    this.state = this._transformState(Store.getState());
  }

  componentDidMount () {
    Store.addChangeListener(this.onChangeState, this);
  }

  componentWillUnmount () {
    Store.removeChangeListener(this.onChangeState, this);
  }

  componentDidUpdate () {}

  onChangeState () {
    if (this._lockStateUpdate) {
      return;
    }

    this._lockStateUpdate = true;

    raf(() => {
      this.setState(this._transformState(Store.getState()), () => {
        this._lockStateUpdate = false;
      });
    });
  }

  _transformState (newState) {
    return newState;
  }
}
