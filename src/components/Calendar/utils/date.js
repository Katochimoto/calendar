// @flow

export function parseDate (date: number): Date {
  const _ = 100 * date ^ 0;
  const y = date ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = (10000 * date ^ 0) - _ * 100;
  return new Date(y, m, d, 0, 0, 0, 0);
}

export function formatDate (date: Date): number {
  return ((date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate()) / 10000;
}

export function offsetDay (date: number, offset: number): number {
  const d = parseDate(date);
  d.setDate(d.getDate() + offset);
  return formatDate(d);
}

export function getDay (date: number): number {
  return parseDate(date).getDay();
}
