// @flow

import { getDay, parseDate, formatDate } from './date';
import Strategy from './Datetime/Strategy';

interface DatetimeStrategy {
  gridDaysDayTitle (date: Date): string;
  gridDaysHourTitle (hour: number): string;
  monthNameGenShort (date: Date): string;
}

export default class Datetime {
  _strategy: DatetimeStrategy;

  constructor (strategy: ?DatetimeStrategy) {
    this._strategy = strategy || (new Strategy: DatetimeStrategy);
  }

  gridDaysHourTitle (hour: number): string {
    return this._strategy.gridDaysHourTitle(hour);
  }

  gridDaysDayTitle (date: number): string {
    return this._strategy.gridDaysDayTitle(parseDate(date));
  }

  monthNameGenShort (date: number): string {
    return this._strategy.monthNameGenShort(parseDate(date));
  }

  /**
   * День недели.
   * @param {number} date
   * @returns {number}
   */
  getDay (date: number): number {
    return getDay(date);
  }

  parseDate (date: number): Date {
    return parseDate(date);
  }

  formatDate (date: Date): number {
    return formatDate(date);
  }
}
