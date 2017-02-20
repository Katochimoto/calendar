import fecha from 'fecha';

const PARSE_CACHE = {};

export default function Datetime (strategy) {

}

Datetime.prototype = {
  parse (sDate, format) {
    const key = `${sDate}>${format}`;
    return PARSE_CACHE[ key ] || (PARSE_CACHE[ key ] = fecha.parse(sDate, format));
  },

  gridDaysHourTitle (hour) {
    return String(hour);
  },

  gridDaysDayTitle (sDate) {
    const date = this.parse(sDate, 'YYYY-MM-DD');
    return fecha.format(date, 'ddd, D');
  },

  offsetDay (sDate, offset) {
    const date = this.parse(sDate, 'YYYY-MM-DD');
    date.setUTCDate(date.getUTCDate() + offset);
    return fecha.format(date, 'YYYY-MM-DD');
  }
};
