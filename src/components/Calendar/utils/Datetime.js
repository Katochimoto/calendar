import DatetimeStrategyDefault from './Datetime/DatetimeStrategyDefault';

export default class Datetime {
  constructor (strategy) {
    this._strategy = strategy || new DatetimeStrategyDefault();
    this.HOURMS = Datetime.HOURMS;
  }

  gridDaysHourTitle (hour) {
    return this._strategy.gridDaysHourTitle(hour);
  }

  gridDaysDayTitle (date) {
    return this._strategy.gridDaysDayTitle(date);
  }

  offsetDay (date, offset) {
    return this._strategy.offsetDay(date, offset);
  }

  getDay (date) {
    return this._strategy.getDay(date);
  }

  parseDate (date) {
    return this._strategy.parseDate(date);
  }
}

Datetime.HOURMS = 60 * 60 * 1000;
