// @flow

import { lazy } from './decorators/lazy';

const CALLBACKS = Symbol('event-emitter-callbacks');

export default class EventEmitter {
  [ CALLBACKS ]: Array<[Function, Object]>;

  constructor () {
    this[ CALLBACKS ] = [];
  }

  destroy () {
    this[ CALLBACKS ] = [];
  }

  emitChangeSync (): void {
    const len = this[ CALLBACKS ].length;
    let i = 0;

    for (; i < len; i++) {
      const item = this[ CALLBACKS ][i];
      if (item[1]) {
        item[0].call(item[1]);
      } else {
        item[0]();
      }
    }
  }

  @lazy
  emitChange (): void {
    this.emitChangeSync();
  }

  addChangeListener (callback: Function, ctx: Object): void {
    this.removeChangeListener(callback, ctx);
    this[ CALLBACKS ].push([ callback, ctx ]);
  }

  removeChangeListener (callback: Function, ctx: Object): void {
    let i = 0;
    while (i < this[ CALLBACKS ].length) {
      const item = this[ CALLBACKS ][ i ];
      if (item[0] === callback && item[1] === ctx) {
        this[ CALLBACKS ].splice(i, 1);
      } else {
        i++;
      }
    }
  }
}
