import createState from './utils/createState';

export default function Store (data) {
  const { state, update, scrollXByOffset } = createState();
  this._state = state
  this._update = update;
  this._callbacks = [];

  this.scrollXByOffset = scrollXByOffset;

  update(data);
}

Store.prototype = {
  update (data) {
    if (this._update(data)) {
      for (let i = 0, len = this._callbacks.length; i < len; i++) {
        const item = this._callbacks[i];
        item[0].call(item[1]);
      }
    }
  },

  getState () {
    return this._state;
  },

  addListener (callback, ctx) {
    this._callbacks.push([ callback, ctx ]);
  },

  removeListener (callback, ctx) {
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
