const REG_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

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
    const date = parseDate(sDate);
    return `${DAYS[ date.getDay() ]}, ${date.getDate()}`;
  },

  offsetDay (sDate, offset) {
    const date = parseDate(sDate);
    date.setDate(date.getDate() + offset);
    return formatDate(date);
  },

  getDay (sDate) {
    const date = parseDate(sDate);
    return date.getDay();
  }
};

function parseDate (sDate) {
  const m = sDate.match(REG_DATE);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

function formatDate (date) {
  return `${date.getFullYear()}-${o(date.getMonth() + 1)}-${o(date.getDate())}`;
}

function o (v) {
  return v < 10 ? '0' + v : '' + v;
}
