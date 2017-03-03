const DAYS = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};

export default function Datetime (strategy) {

}

Datetime.prototype = {
  gridDaysHourTitle (hour) {
    return String(hour);
  },

  gridDaysDayTitle (sDate) {
    const date = _parseDate(sDate);
    return `${DAYS[ date.getDay() ]}, ${date.getDate()}`;
  },

  offsetDay (sDate, offset) {
    const date = _parseDate(sDate);
    date.setDate(date.getDate() + offset);
    return _formatDate(date);
  },

  getDay (sDate) {
    const date = _parseDate(sDate);
    return date.getDay();
  },

  getMinutesRate (date, hoursOfDay = 24) {
    const minutes = date.getHours() * 60 + date.getMinutes();
    return Math.round(1000 * 100 * minutes / (hoursOfDay * 60)) / 1000;
  },

  parseDate (sDate) {
    return _parseDate(sDate);
  }
};

function _parseDate (date) {
  const _ = 100 * date ^ 0;
  const y = date ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = (10000 * date ^ 0) - _ * 100;
  return new Date(y, m, d);
}

function _formatDate (date) {
  return Number(`${date.getFullYear()}.${o(date.getMonth() + 1)}${o(date.getDate())}`);
}

function o (v) {
  return v < 10 ? '0' + v : '' + v;
}
