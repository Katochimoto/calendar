// @flow

import EventEmitter from './EventEmitter';
import StoreStrategy from './StoreStrategy';
import Strategy from './GridStore/Strategy';
import { getDay } from './date';

export default class GridStore extends EventEmitter {
  _strategy: StoreInterface;

  constructor (strategy: StoreStrategy) {
    super();
    this._strategy = strategy || (new Strategy: StoreStrategy);
  }

  update (data: {[id:string]: any}) {
    this._strategy.update(data) && this.emitChange();
  }

  getState () {
    return this._strategy.state;
  }

  gridDateOffset (date: number, offset: number): number {
    return this._strategy.gridDateOffset(date, offset);
  }

  timeToRate (time: number): number {
    return this._strategy.timeToRate(time);
  }

  checkWeekend (date: number): boolean {
    return (getDay(date) in this._strategy.state.WEEKENDS_SET);
  }
}
