// @flow

import {
  createIntervals,
  toObject,
} from '../../utils/array';

import {
  HOURMS,
  getDay,
} from '../../utils/date';

import {
  GRID,
} from '../../constant';

export function strategyGrid (component) {
  Object.assign(component.prototype, protoGrid);
}

export function strategyGridConstructor () {

}

const protoGrid = {
  /**
   * @abstract
   */
  gridDateOffset (date: number, offset: number): number {
    // ...
  },

  /**
   * @abstract
   */
  gridDateItemOffset (date: number, offset: number): number {
    // ...
  },

  /**
   * @abstract
   */
  _gridDateOffsetNext () {
    // ...
  },

  /**
   * @abstract
   */
  _gridDateOffsetPrev () {
    // ...
  },

  timeToRate (time: number): number {
    const hour = time / HOURMS | 0;
    const ms = time % HOURMS;
    const grid = this.current.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this.current.DAYMS) / 1000;
  },

  checkWeekend (date: number): boolean {
    return (getDay(date) in this.current.WEEKENDS_SET);
  },

  _hoursOfDaySetter (value: string) {
    const list = value
      .split(',')
      .map(Number)
      .filter((item: number) => (item >= 0 && item <= 23));

    list.sort((a: number, b: number) => (a - b));

    value = list.join(',');

    if (value !== this.current.hoursOfDay) {
      this.current.hoursOfDay = value;
      this.current.DAYMS = list.length * HOURMS;
      this.current.GRID_HOURS = toObject(list);
      this.current.INTERVALS = createIntervals(list);
      this.isChanged = true;
    }
  },

  _weekendsSetter (value: string) {
    const list = value
      .split(',')
      .map(Number)
      .filter((item: number) => (item >= 0 && item <= 6));

    list.sort((a: number, b: number) => (a - b));

    value = list.join(',');

    if (value !== this.current.weekends) {
      this.current.weekends = value;
      this.current.WEEKENDS_SET = toObject(list);
      this._updateVisibleDate();
      this.isChanged = true;
    }
  },

  _hideWeekendsSetter (value: boolean) {
    value = Boolean(value);
    if (value !== this.current.hideWeekends) {
      this.current.hideWeekends = value;
      this._updateVisibleDate();
      this.isChanged = true;
    }
  },

  _gridDaysItemSizeSetter (value: number) {
    value = value | 0;
    if (value > 0 && value !== this.current.gridDaysItemSize) {
      this.current.gridDaysItemSize = value;
      this._updateVisibleDate();
      this.isChanged = true;
    }
  },

  _gridMonthItemSizeSetter (value: number) {
    value = value | 0;
    if (value > 0 && value !== this.current.gridMonthItemSize) {
      this.current.gridMonthItemSize = value;
      this._updateVisibleDate();
      this.isChanged = true;
    }
  },

  _currentDateSetter (value: number) {
    value = value | 0;
    if (value > 0 && value !== this.current.currentDate) {
      this.current.currentDate = value;
      this._updateVisibleDate();
      this.isChanged = true;
    }
  },
};
