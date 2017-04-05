// @flow

import EventEmitter from './EventEmitter';
import StoreStrategyDefault from './Store/StoreStrategyDefault';
import { getDay, HOURMS } from './date';

interface StoreInterface {
  state: {[id:string]: any};
  update (data: {[id:string]: any}): boolean;
  updateScroll (deltaX: number, deltaY: number): boolean;
  isVisibleOffset (offset: number): boolean;
  gridDateOffset (date: number, offset: number): number;
  timeToRate (time: number): number;
}

export default class Store extends EventEmitter {
  _state: StoreInterface;

  constructor (data: {[id:string]: any}) {
    super();
    this._state = (new StoreStrategyDefault: StoreInterface);
    this._state.update(data);
  }

  update (data: {[id:string]: any}) {
    if (this._state.update(data)) {
      this.emitChange();
    }
  }

  updateScroll (deltaX: number, deltaY: number) {
    if (this._state.updateScroll(deltaX, deltaY)) {
      this.emitChange();
    }
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
    return this._state.timeToRate(time);
  }

  checkWeekend (date: number): boolean {
    return (getDay(date) in this._state.state.WEEKENDS_SET);
  }
}
