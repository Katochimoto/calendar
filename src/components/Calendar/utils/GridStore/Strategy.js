// @flow

import StoreStrategy from '../StoreStrategy';
import { toObject, createIntervals } from '../array';
import { offsetOnDay, offsetOnWorksDay, HOURMS } from '../date';
import defaultState from './defaultState';

export default class Strategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
  }

  gridDateOffset (date: number, offset: number): number {
    // day grid
    if (this.current.hideWeekends) {
      return offsetOnWorksDay(date, offset, this.current.WEEKENDS_SET);
    } else {
      return offsetOnDay(date, offset);
    }
  }

  timeToRate (time: number): number {
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this.current.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this.current.DAYMS) / 1000;
  }

  _hoursOfDaySetter (value) {
    const list = value
      .split(',')
      .map(Number)
      .filter(item => (item >= 0 && item <= 23));

    list.sort((a, b) => (a - b));

    value = list.join(',');

    if (value !== this.current.hoursOfDay) {
      this.current.hoursOfDay = value;
      this.current.DAYMS = list.length * HOURMS;
      this.current.GRID_HOURS = toObject(list);
      this.current.INTERVALS = createIntervals(list);
      this.isChanged = true;
    }
  }

  _weekendsSetter (value) {
    const list = value
      .split(',')
      .map(Number)
      .filter(item => (item >= 0 && item <= 6));

    list.sort((a, b) => (a - b));

    value = list.join(',');

    if (value !== this.current.weekends) {
      this.current.weekends = value;
      this.current.WEEKENDS_SET = toObject(list);
      this.isChanged = true;
    }
  }

  _hideWeekendsSetter (value) {
    value = Boolean(value);
    if (value !== this.current.hideWeekends) {
      this.current.hideWeekends = value;
      this.isChanged = true;
    }
  }
}
