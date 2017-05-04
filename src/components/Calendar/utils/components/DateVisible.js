// @flow
import GridStore from '../GridStore';
import InfiniteStore from '../InfiniteStore';
import { idle } from '../decorators/lazy';

export default class DateVisible {
  _grid: ?GridStore;
  _infinite: ?InfiniteStore;

  constructor (grid: GridStore, infinite: InfiniteStore) {
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
      gridMonthItemSize,

      listRange,
      scrollHeight,
      scrollY,
    } = this._state;

    /*const itemCount = listRange * 2 + 1;
    const itemSize = itemCount * gridMonthItemSize;
    const height = itemCount * scrollHeight;
    const itemHeight = height / itemSize;

    const visibleStart = Math.abs(scrollY / itemHeight);
    let visibleEnd = visibleStart + gridMonthItemSize;
    const visibleRateStart = 100 - (visibleStart % 1 * 100 | 0);
    let visibleRateEnd = 100 - visibleRateStart;

    if (visibleRateEnd === 0) {
      visibleEnd--;
      visibleRateEnd = 100;
    }

    const rangeY = [
      (visibleStart | 0) - gridMonthItemSize,
      visibleRateStart,
      (visibleEnd | 0) - gridMonthItemSize,
      visibleRateEnd
    ];*/

    const itemSize = listRange * 2 + 1;
    const visibleStart = Math.abs(scrollY / scrollHeight);
    const visibleRateStart = 10000 - (visibleStart % 1 * 10000 | 0);
    let visibleEnd = visibleStart + 1;
    let visibleRateEnd = 10000 - visibleRateStart;

    if (visibleRateEnd === 0) {
      visibleEnd--;
      visibleRateEnd = 10000;
    }

    const rangeY = [
      (visibleStart | 0) - listRange,
      visibleRateStart / 100,
      (visibleEnd | 0) - listRange,
      visibleRateEnd / 100
    ];

    console.log(rangeY);
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
