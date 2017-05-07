// @flow

import Store from './Store';
import StoreStrategy from './StoreStrategy';
import Strategy from './DateVisible/Strategy';

import GridStore from './GridStore';
import InfiniteStore from './InfiniteStore';

import { idle } from '../utils/decorators/lazy';

export default class DateVisible extends Store {
  _grid: ?GridStore;
  _infinite: ?InfiniteStore;

  constructor (grid: GridStore, infinite: InfiniteStore) {
    super(new Strategy: StoreStrategy);

    this._grid = grid;
    this._infinite = infinite;

    this._grid.addChangeListener(this._handleChange, this);
    this._infinite.addChangeListener(this._handleChange, this);

    this._updateState();
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
    this._updateState();

    const {
      currentDate,
      gridDaysItemSize,
      gridMonthItemSize,
      hideWeekends,
      weekends,
    } = this._state;

    const range = this._infinite.getVisibleRange();
    const len = range.length;

    for (let i = 0; i < len; i = i + 2) {
      const item = range[i];
      const rate = range[i + 1];

      // обход с начала
      if (i % 4) {

      // обход с конца
      } else {

      }
    }

    console.log(range);
  }

  _updateState () {
    const {
      currentDate,
      gridDaysItemSize,
      gridMonthItemSize,
      hideWeekends,
      weekends,
    } = this._grid.getState();

    const {
      listRange,
      SAXISX,
      scrollHeight,
      scrollOffsetBottom,
      scrollOffsetLeft,
      scrollOffsetRight,
      scrollOffsetTop,
      scrollWidth,
      scrollX,
      scrollY,
    } = this._infinite.getState();

    this._state = {
      currentDate,
      gridDaysItemSize,
      gridMonthItemSize,
      hideWeekends,
      weekends,

      listRange,
      SAXISX,
      scrollHeight,
      scrollOffsetBottom,
      scrollOffsetLeft,
      scrollOffsetRight,
      scrollOffsetTop,
      scrollWidth,
      scrollX,
      scrollY,
    };
  }
}
