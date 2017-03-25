import { parseDate, formatDate, offsetDay } from '../date';
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
    const d = parseDate(date);
    return `${DAYS[ d.getDay() ]}, ${d.getDate()}`;
  }

  offsetDay (date, offset) {
    return offsetDay(date, offset);
  }

  getDay (date) {
    const d = parseDate(date);
    return d.getDay();
  }

  parseDate (date) {
    return parseDate(date);
  }

  formatDate (date) {
    return formatDate(date);
  }
}
