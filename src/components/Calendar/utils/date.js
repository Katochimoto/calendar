// @flow

export const HOURMS = 60 * 60 * 1000;

export function parseDate (date: number): Date {
  const _ = 100 * date ^ 0;
  const y = date ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = (10000 * date ^ 0) - _ * 100;
  return new Date(y, m, d, 0, 0, 0, 0);
}

export function formatDate (date: Date): number {
  return (
    (date.getFullYear() * 10000) +
    ((date.getMonth() + 1) * 100) +
    date.getDate()
  ) / 10000;
}

/**
 * Смещение даты на количество дней.
 * @param {number} date
 * @param {number} offset
 * @returns {number}
 */
export function offsetOnDay (
  date: number,
  offset: number
): number {
  const d = parseDate(date);
  d.setDate(d.getDate() + offset);
  return formatDate(d);
}

/**
 * Смещение даты на количество рабочих дней.
 * Результат не может приходится на выходной.
 * Смещение начинается с первого рабочего дня, если переданное выходной.
 * Выходные игнорируются, если вся неделя не рабочая.
 * @param {number} date
 * @param {number} offset количество рабочих дней
 * @param {Object.<string, number>} weekends объект выходных дней недели
 * @returns {number}
 */
export function offsetOnWorksDay (
  date: number,
  offset: number,
  weekends: {[id:string|number]: number} = {}
): number {
  const d = parseDate(date);
  let len = Object.keys(weekends).length;

  if (len > 0 && len < 7) {
    const sig = offset < 0 ? -1 : 1;
    offset = Math.abs(offset);

    let idx = 0;
    while (idx < offset) {
      d.setDate(d.getDate() + sig);
      if (!(d.getDay() in weekends)) {
        idx++;
      }
    }

  } else {
    d.setDate(d.getDate() + offset);
  }

  return formatDate(d);
}

/**
 * День недели.
 * @param {number} date
 * @returns {number}
 */
export function getDay (date: number): number {
  return parseDate(date).getDay();
}
