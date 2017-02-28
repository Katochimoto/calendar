import EventEmitter from './utils/EventEmitter';
import createState from './utils/createState';
import inherit from './utils/inherit';

export default function Store (data) {
  Store.superclass.constructor.call(this);
  this._state = createState();
  this._state.update(data);
}

inherit(Store, EventEmitter);

Store.prototype.update = function (data) {
  if (this._state.update(data)) {
    this.emit();
  }
};

Store.prototype.getState = function () {
  return this._state.state;
};

Store.prototype.scrollXByOffset = function (listOffset) {
  return this._state.scrollXByOffset(listOffset);
};
