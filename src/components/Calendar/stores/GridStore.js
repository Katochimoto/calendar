// @flow

import Store from './Store';
import StoreStrategy from './StoreStrategy';
import Strategy from './GridStore/Strategy';
import { getDay } from '../utils/date';

export default class GridStore extends Store {
  constructor (strategy: StoreStrategy) {
    super(strategy || (new Strategy: StoreStrategy));
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
