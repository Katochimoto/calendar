// @flow

import { lazy } from './lazy';

export default class EventEmitter {
  _callbacks: Array<[Function, Object]>;

  constructor () {
    this._callbacks = [];
  }

  emitChangeSync (): void {
    for (let i = 0, len = this._callbacks.length; i < len; i++) {
      const item = this._callbacks[i];
      item[0].call(item[1]);
    }
  }

  @lazy
  emitChange (): void {
    this.emitChangeSync();
  }

  addChangeListener (callback: Function, ctx: Object): void {
    this._callbacks.push([ callback, ctx ]);
  }

  removeChangeListener (callback: Function, ctx: Object): void {
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
}
