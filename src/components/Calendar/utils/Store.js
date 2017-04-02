// @flow

import EventEmitter from './EventEmitter';
import createState from './Store/createState';
import { getDay, HOURMS } from './date';
import { lazy } from './lazy';

interface IState {
  state: {[id:string]: any};
  update (data: {[id:string]: any}): void;
  isVisibleOffset (offset: number): boolean;
  gridDateOffset (date: number, offset: number): number;
}

export default class Store extends EventEmitter {
  _state: IState;

  constructor (data: {[id:string]: any}) {
    super();
    this._state = createState();
    this._state.update(data);
  }

  @lazy
  emitChange () {
    super.emitChange();
  }

  update (data: {[id:string]: any}) {
    if (this._state.update(data)) {
      this.emitChange();
    }
  }

  updateScroll (deltaX: number, deltaY: number) {
    this.update({
      scrollX: this._state.state.scrollX + deltaX,
      scrollY: this._state.state.scrollY + deltaY,
      speedScrollX: deltaX,
      speedScrollY: deltaY
    });
  }

  getState () {
    return this._state.state;
  }

  isVisibleOffset (offset: number): boolean {
    return this._state.isVisibleOffset(offset);
  }

  gridDateOffset (date: number, offset: number): number {
    return this._state.gridDateOffset(date, offset);
  }

  timeToRate (time: number): number {
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this._state.state.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this._state.state.DAYMS) / 1000;
  }

  checkWeekend (date: number): boolean {
    return (getDay(date) in this._state.state.WEEKENDS_SET);
  }
}
