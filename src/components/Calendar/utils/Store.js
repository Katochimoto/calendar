import EventEmitter from './EventEmitter';
import createState from './Store/createState';

export default class Store extends EventEmitter {
  constructor (data) {
    super();
    this._state = createState();
    this._state.update(data);
  }

  update (data) {
    if (this._state.update(data)) {
      this.emitChange();
    }
  }

  getState () {
    return this._state.state;
  }

  scrollXByOffset (listOffset) {
    return this._state.scrollXByOffset(listOffset);
  }

  getRate (time) {
    return this._state.getRate(time);
  }
}
