export function parseDate (date) {
  const _ = 100 * date ^ 0;
  const y = date ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = (10000 * date ^ 0) - _ * 100;
  return new Date(y, m, d);
}

export function formatDate (date) {
  return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate()) / 10000;
}

export function offsetDay (date, offset) {
  const d = parseDate(date);
  d.setDate(d.getDate() + offset);
  return formatDate(d);
}

/*
function o (v) {
  return v < 10 ? '0' + v : '' + v;
}
*/
