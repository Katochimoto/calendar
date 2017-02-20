import fecha from 'fecha';

export default function Datetime (strategy) {

}

Datetime.prototype = {
  gridDaysHourTitle (hour) {
    return String(hour);
  },

  gridDaysDayTitle (sDate) {
    const date = fecha.parse(sDate, 'YYYY-MM-DD');
    return fecha.format(date, 'ddd, D');
  },

  offsetDay (sDate, offset) {
    const date = fecha.parse(sDate, 'YYYY-MM-DD');
    date.setUTCDate(date.getUTCDate() + offset);
    return fecha.format(date, 'YYYY-MM-DD');
  }
};
