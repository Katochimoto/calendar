// @flow

import { lazy } from './lazy';

export default class EventEmitter {
  _callbacks: Array<[Function, Object]>;

  constructor () {
    this._callbacks = Object.create(null);
  }

  destroy () {
    this._callbacks = undefined;
  }

  emitSync (name: string): void {
    const callbacks = this._callbacks[ name ];

    if (!callbacks) {
      return;
    }

    for (let i = 0, len = callbacks.length; i < len; i++) {
      const item = callbacks[i];
      item[0].call(item[1]);
    }
  }

  emitChangeSync (): void {
    this.emitSync('change');
  }

  @lazy
  emit (names: array): void {
    names
      .filter((item, pos) => (names.indexOf(item) === pos))
      .forEach(this.emitSync, this);
  }

  @lazy
  emitChange (): void {
    this.emitChangeSync();
  }

  addChangeListener (callback: Function, ctx: Object): void {
    this.addListener('change', callback, ctx);
  }

  removeChangeListener (callback: Function, ctx: Object): void {
    this.removeListener('change', callback, ctx);
  }

  addListener (name: string, callback: Function, ctx: Object): void {
    if (!(name in this._callbacks)) {
      this._callbacks[ name ] = [];
    }
    this._callbacks[ name ].push([ callback, ctx ]);
  }

  removeListener (name: string, callback: Function, ctx: Object): void {
    const callbacks = this._callbacks[ name ];

    if (!callbacks) {
      return;
    }

    let i = 0;
    while (i < callbacks.length) {
      const item = callbacks[ i ];

      if (item[0] === callback && item[1] === ctx) {
        callbacks.splice(i, 1);

      } else {
        i++;
      }
    }
  }
}
