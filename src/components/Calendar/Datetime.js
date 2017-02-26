const REG_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const REG_DATETIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;

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

  parseDatetime (sDatetime) {
    return _parseDatetime(sDatetime);
  }
};

let PARSE_CACHE = Object.create(null);
let parseCacheLength = 0;

function _parseDate (sDate) {
  if (parseCacheLength > 500) {
    parseCacheLength = 0;
    PARSE_CACHE = Object.create(null);
  }

  let timestamp = PARSE_CACHE[ sDate ];

  if (!timestamp) {
    parseCacheLength++
    const m = sDate.match(REG_DATE);
    timestamp = PARSE_CACHE[ sDate ] = new Date(
      Number(m[1]),
      Number(m[2]) - 1,
      Number(m[3])
    ).getTime();
  }

  return new Date(timestamp);
}

function _parseDatetime (sDatetime) {
  const m = sDatetime.match(REG_DATETIME);
  return new Date(
    Number(m[1]),
    Number(m[2]) - 1,
    Number(m[3]),
    Number(m[4]),
    Number(m[5]),
    Number(m[6])
  );
}

function _formatDate (date) {
  return `${date.getFullYear()}-${o(date.getMonth() + 1)}-${o(date.getDate())}`;
}

function o (v) {
  return v < 10 ? '0' + v : '' + v;
}
