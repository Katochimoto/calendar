import { toObject, createIntervals } from '../array';
import { offsetOnDay, offsetOnWorksDay, HOURMS } from '../date';
import defaultState from './defaultState';

export default function createState () {
  const current = { ...defaultState };
  const state = Object.create(null);

  let isChangedValues = false;

  Object.defineProperties(state, {
    /**
     * [scrollHeight description]
     * @type {number}
     * @public
     */
    scrollHeight: {
      enumerable: true,
      get: () => current.scrollHeight,
      set: (value) => {
        const scrollHeight = current.scrollHeight;

        current.scrollHeight = value;
        current.scrollOffsetTop = -1 * value;
        current.scrollY = scrollHeight > 0 ? limitScrollY(current.scrollY * value / scrollHeight, current) : 0;

        isChangedValues = true;
      }
    },

    /**
     * [scrollWidth description]
     * @type {number}
     * @public
     */
    scrollWidth: {
      enumerable: true,
      get: () => current.scrollWidth,
      set: (value) => {
        const scrollWidth = current.scrollWidth;
        const currentDate = current.currentDate;

        current.scrollWidth = value;
        current.scrollOffsetLeft = -2 * current.LIST_RANGE * value;
        // current.speedScrollX = 0;
        current.scrollX = current.scrollX === undefined ?
          limitScrollX(getScrollXByOffset(0, current), current) :
          scrollWidth > 0 ? limitScrollX(current.scrollX * value / scrollWidth, current) : 0;
        current.currentDate = getCurrentDate(current);
        current.scrollX = correctScrollX(currentDate, current);

        isChangedValues = true;
      }
    },

    /**
     * смещение скрола по оси X = -1 * LIST_RANGE * scrollWidth
     * @type {number}
     * @public
     */
    scrollX: {
      enumerable: true,
      get: () => current.scrollX,
      set: (value) => {
        value = limitScrollX(value, current);
        if (value === current.scrollX) {
          // current.speedScrollX = 0;
          return;
        }

        const currentDate = current.currentDate;

        // current.speedScrollX = current.scrollX - value;
        current.scrollX = value;
        current.currentDate = getCurrentDate(current);
        current.scrollX = correctScrollX(currentDate, current);

        isChangedValues = true;
      }
    },

    /**
     * скорость скролла по X: вправо > 0; влево < 0;
     * @type {number}
     * @public
     * @readonly
     */
    // speedScrollX: {
    //   enumerable: true,
    //   get: () => current.speedScrollX
    // },

    /**
     * смещение скрола по оси Y
     * @type {number}
     * @public
     */
    scrollY: {
      enumerable: true,
      get: () => current.scrollY,
      set: (value) => {
        value = limitScrollY(value, current)
        if (value !== current.scrollY) {
          current.scrollY = value;
          isChangedValues = true;
        }
      }
    },

    /**
     * Количество предзагружаемых заранее интервалов InfiniteList слева и справа от текущего
     * @constant {number}
     * @public
     * @readonly
     */
    LIST_RANGE: {
      enumerable: true,
      value: current.LIST_RANGE
    },

    /**
     * Рабочие часы в сутках
     * @type {string}
     * @public
     */
    hoursOfDay: {
      enumerable: true,
      get: () => current.hoursOfDay,
      set: (value) => {
        const list = value
          .split(',')
          .map(Number)
          .filter(item => (item >= 0 && item <= 23));

        list.sort((a, b) => (a - b));

        value = list.join(',');

        if (value !== current.hoursOfDay) {
          current.hoursOfDay = value;
          current.DAYMS = list.length * HOURMS;
          current.GRID_HOURS = toObject(list);
          current.INTERVALS = createIntervals(list);
          isChangedValues = true;
        }
      }
    },

    /**
     * Количество миллисекунд в сутках
     * @type {number}
     * @public
     * @readonly
     */
    DAYMS: {
      enumerable: true,
      get: () => current.DAYMS
    },

    /**
     * Объект соответствия рабочего часа с реальным положением в сетке
     * @constant {Object.<string, number>}
     * @public
     */
    GRID_HOURS: {
      enumerable: true,
      get: () => current.GRID_HOURS
    },

    /**
     * Рабочие интервалы в сутках
     * @type {Object}
     * @public
     * @readonly
     */
    INTERVALS: {
      enumerable: true,
      get: () => current.INTERVALS
    },

    /**
     * Количество дней в одном элементе InfiniteList.
     * Для сетки по дням.
     * @type {number}
     * @public
     */
    gridDaysItemSize: {
      enumerable: true,
      get: () => current.gridDaysItemSize,
      set: (value) => {
        current.gridDaysItemSize = value;
        isChangedValues = true;
      }
    },

    /**
     * Текущая дата
     * @type {string}
     * @public
     */
    currentDate: {
      enumerable: true,
      get: () => current.currentDate,
      set: (value) => {
        current.currentDate = value;
        current.scrollX = limitScrollX(getScrollXByOffset(0, current), current);
        isChangedValues = true;
      }
    },

    /**
     * Выходные дни недели
     * @type {string}
     * @public
     */
    weekends: {
      enumerable: true,
      get: () => current.weekends,
      set: (value) => {
        const list = value
          .split(',')
          .map(Number)
          .filter(item => (item >= 0 && item <= 6));

        list.sort((a, b) => (a - b));

        value = list.join(',');

        if (value !== current.weekends) {
          current.weekends = value;
          current.WEEKENDS_SET = toObject(list);
          isChangedValues = true;
        }
      }
    },

    /**
     * Объект дней недели
     * @constant {Object.<string, number>}
     * @public
     */
    WEEKENDS_SET: {
      enumerable: true,
      get: () => current.WEEKENDS_SET
    },

    /**
     * Начинать неделю с дня
     * @type {number}
     * @public
     */
    beginningOfWeek: {
      enumerable: true,
      get: () => current.beginningOfWeek,
      set: (value) => {
        current.beginningOfWeek = value;
        isChangedValues = true;
      }
    },

    /**
     * Скрывать выходные
     * @type {boolean}
     * @public
     */
    hideWeekends: {
      enumerable: true,
      get: () => current.hideWeekends,
      set: (value) => {
        value = Boolean(value);
        if (value !== current.hideWeekends) {
          current.hideWeekends = value;
          isChangedValues = true;
        }
      }
    }
  });

  return {
    state,

    update (data) {
      isChangedValues = false;

      if (data) {
        for (const name in data) {
          if (data.hasOwnProperty(name) &&
            name in state &&
            data[ name ] !== state[ name ]) {

            state[ name ] = data[ name ];
          }
        }
      }

      return isChangedValues;
    },

    isVisibleOffset (offset) {
      const scrollX = current.scrollX;
      const scrollWidth = current.scrollWidth;
      const LIST_RANGE = current.LIST_RANGE;
      const min = getScrollXByOffset(offset, current);
      const max = min - scrollWidth;

      return scrollX !== undefined && !Boolean(
        max >= scrollX / LIST_RANGE ||
        min <= scrollX - scrollWidth * LIST_RANGE
      );
    },

    gridDateOffset (date, offset) {
      return gridDateOffset(date, offset, current);
    }
  };
}

function getCurrentDate (state) {
  const {
    currentDate,
    gridDaysItemSize,
    LIST_RANGE,
    scrollOffsetLeft,
    scrollOffsetRight,
    scrollX
  } = state;

  const scrollOffsetCenter = (scrollOffsetLeft + scrollOffsetRight) / 2;
  const scrollOffsetWidth = scrollOffsetLeft > scrollOffsetRight ?
    scrollOffsetLeft - scrollOffsetRight :
    scrollOffsetRight - scrollOffsetLeft;
  const centerOffsetWidth = scrollOffsetWidth / 2;
  const sign = scrollX > scrollOffsetCenter ? 1 : -1;
  const scrollX2CenterWidth = scrollX > scrollOffsetCenter ?
    scrollX - scrollOffsetCenter :
    scrollOffsetCenter - scrollX;
  const rate = centerOffsetWidth ? sign * scrollX2CenterWidth * 100 / centerOffsetWidth : 0;
  const rateCompare = 100 / LIST_RANGE;

  return do {
    if (rate <= -(rateCompare)) {
      gridDateOffset(currentDate, gridDaysItemSize, state);
    } else if (rate >= rateCompare) {
      gridDateOffset(currentDate, -(gridDaysItemSize), state);
    } else {
      currentDate;
    }
  };
}

function gridDateOffset (date, offset, state) {
  const {
    hideWeekends,
    WEEKENDS_SET
  } = state;

  // day grid
  if (hideWeekends) {
    return offsetOnWorksDay(date, offset, WEEKENDS_SET);
  } else {
    return offsetOnDay(date, offset);
  }
}

function limitScroll (value, min, max) {
  return value < min ? min : value > max ? max : Math.round(value);
}

function limitScrollY (value, { scrollOffsetTop, scrollOffsetBottom }) {
  return limitScroll(value, scrollOffsetTop, scrollOffsetBottom);
}

function limitScrollX (value, { scrollOffsetLeft, scrollOffsetRight }) {
  return limitScroll(value, scrollOffsetLeft, scrollOffsetRight);
}

function correctScrollX (oldCurrentDate, state) {
  const {
    scrollWidth,
    scrollX,
    currentDate
  } = state;

  if (oldCurrentDate === currentDate) {
    return scrollX;
  }

  const diff = currentDate > oldCurrentDate ? 1 : -1;
  return limitScrollX(scrollX + diff * scrollWidth, state);
}

function getScrollXByOffset (offset, { LIST_RANGE, scrollWidth }) {
  return (offset + 1) * -1 * LIST_RANGE * scrollWidth;
}
