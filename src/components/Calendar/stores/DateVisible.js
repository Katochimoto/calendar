// @flow

import Store from './Store';
import StoreStrategy from './StoreStrategy';
import Strategy from './DateVisible/Strategy';

import GridStore from './GridStore';
import InfiniteStore from './InfiniteStore';

import { idle } from '../utils/decorators/lazy';
import { offsetOnDay, getMonthDate } from '../utils/date';

export default class DateVisible extends Store {
  _grid: ?GridStore;
  _infinite: ?InfiniteStore;

  constructor (grid: GridStore, infinite: InfiniteStore) {
    super(new Strategy: StoreStrategy);

    this._grid = grid;
    this._infinite = infinite;
    this._grid.addChangeListener(this._handleChange, this);
    this._infinite.addChangeListener(this._handleChange, this);
  }

  destroy () {
    if (this._grid) {
      this._grid.removeChangeListener(this._handleChange, this);
      this._grid = null;
    }

    if (this._infinite) {
      this._infinite.removeChangeListener(this._handleChange, this);
      this._infinite = null;
    }

    super.destroy();
  }

  /**
   * @param {number} date
   * @returns {number} процент видимости даты
   */
  check (date: number): number {

  }

  @idle
  _handleChange () {
    const {
      currentDate,
      gridDaysItemSize,
      gridMonthItemSize,
      hideWeekends,
      weekends,
    } = this._grid.getState();

    const range = this._infinite.getVisibleRange();
    const startItem = range[0];
    const startRate = range[1];
    const endItem = range[2];
    const endRate = range[3];
    const itemRate = 100 / gridMonthItemSize;
    const daysInItem = 7;
    const itemSize = gridMonthItemSize * daysInItem;

    const startFullVisibleItem = startRate / itemRate | 0;
    const startRateRest = startRate % itemRate;
    const startPartVisibleItem = startFullVisibleItem + (startRateRest ? 1 : 0);
    const rateBegin = 100 * startRateRest / itemRate | 0;

    const endFullVisibleItem = endRate / itemRate | 0;
    const endRateRest = endRate % itemRate;
    const endPartVisibleItem = endFullVisibleItem + (endRateRest ? 1 : 0);
    const rateEnd = 100 * endRateRest / itemRate | 0;

    const daysFullBegin = itemSize + (startItem * itemSize) - startFullVisibleItem * daysInItem;
    const daysFullEnd = endItem * itemSize + endFullVisibleItem * daysInItem - 1;
    const daysPartBegin = itemSize + (startItem * itemSize) - startPartVisibleItem * daysInItem;
    const daysPartEnd = endItem * itemSize + endPartVisibleItem * daysInItem - 1;

    const dateFullBegin = offsetOnDay(currentDate, daysFullBegin);
    const dateFullEnd = offsetOnDay(currentDate, daysFullEnd);
    const datePartBegin = offsetOnDay(currentDate, daysPartBegin);
    const datePartEnd = offsetOnDay(currentDate, daysPartEnd);

    const day = dateFullBegin;
    const month = getMonthDate(offsetOnDay(dateFullBegin, 10));

    this.update({
      dateFullBegin,
      dateFullEnd,
      datePartBegin,
      datePartEnd,
      day,
      month,
      rateBegin,
      rateEnd,
    });
  }
}
