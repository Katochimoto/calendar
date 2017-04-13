// @flow

import { getDay, parseDate, formatDate } from './date';
import DatetimeStrategyDefault from './Datetime/DatetimeStrategyDefault';

interface DatetimeStrategy {
  gridDaysHourTitle (hour: number): string;
  gridDaysDayTitle (date: Date): string;
}

export default class Datetime {
  _strategy: DatetimeStrategy;

  constructor (strategy: ?DatetimeStrategy) {
    this._strategy = strategy || (new DatetimeStrategyDefault: DatetimeStrategy);
  }

  gridDaysHourTitle (hour: number): string {
    return this._strategy.gridDaysHourTitle(hour);
  }

  gridDaysDayTitle (date: number): string {
    return this._strategy.gridDaysDayTitle(parseDate(date));
  }

  /**
   * День недели
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
