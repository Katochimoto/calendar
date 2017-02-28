export default function EventEmitter () {
  this._callbacks = [];
}

EventEmitter.prototype = {
  constructor: EventEmitter,

  emitChange () {
    for (let i = 0, len = this._callbacks.length; i < len; i++) {
      const item = this._callbacks[i];
      item[0].call(item[1]);
    }
  },

  addChangeListener (callback, ctx) {
    this._callbacks.push([ callback, ctx ]);
  },

  removeChangeListener (callback, ctx) {
    let i = 0;
    while (i < this._callbacks.length) {
      const item = this._callbacks[i];

      if (item[0] === callback && item[1] === ctx) {
        this._callbacks.splice(i, 1);

      } else {
        i++;
      }
    }
  }
};
