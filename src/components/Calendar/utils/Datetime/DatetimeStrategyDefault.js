import DatetimeStrategy from './DatetimeStrategy';

const DAYS = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};

export default class DatetimeStrategyDefault extends DatetimeStrategy {
  gridDaysHourTitle (hour) {
    return String(hour);
  }

  gridDaysDayTitle (date) {
    const d = _parseDate(date);
    return `${DAYS[ d.getDay() ]}, ${d.getDate()}`;
  }

  offsetDay (date, offset) {
    const d = _parseDate(date);
    d.setDate(d.getDate() + offset);
    return _formatDate(d);
  }

  getDay (date) {
    const d = _parseDate(date);
    return d.getDay();
  }

  getMinutesRate (date, hoursOfDay = 24) {
    const minutes = date.getHours() * 60 + date.getMinutes();
    return Math.round(1000 * 100 * minutes / (hoursOfDay * 60)) / 1000;
  }

  parseDate (date) {
    return _parseDate(date);
  }
}

function _parseDate (date) {
  const _ = 100 * date ^ 0;
  const y = date ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = (10000 * date ^ 0) - _ * 100;
  return new Date(y, m, d);
}

function _formatDate (date) {
  return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate()) / 10000;
}

function o (v) {
  return v < 10 ? '0' + v : '' + v;
}
