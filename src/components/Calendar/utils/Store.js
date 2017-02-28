import EventEmitter from './EventEmitter';
import createState from './createState';
import inherit from './inherit';

export default function Store (data) {
  this.super();
  this._state = createState();
  this._state.update(data);
}

inherit(Store, EventEmitter);

Store.prototype.update = function (data) {
  if (this._state.update(data)) {
    this.emitChange();
  }
};

Store.prototype.getState = function () {
  return this._state.state;
};

Store.prototype.scrollXByOffset = function (listOffset) {
  return this._state.scrollXByOffset(listOffset);
};
