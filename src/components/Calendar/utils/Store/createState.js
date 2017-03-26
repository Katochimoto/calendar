import { toObject, createIntervals } from '../array';
import { offsetDay } from '../date';
import { HOURMS } from '../../constant';
import defaultState from './defaultState';

export default function createState () {
  const currentValues = { ...defaultState };
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
      get: () => currentValues.scrollHeight,
      set: (value) => {
        const scrollHeight = currentValues.scrollHeight;

        currentValues.scrollHeight = value;
        currentValues.scrollOffsetTop = -1 * value;
        currentValues.scrollY = scrollHeight > 0 ? limitScrollY(currentValues.scrollY * value / scrollHeight, currentValues) : 0;

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
      get: () => currentValues.scrollWidth,
      set: (value) => {
        const scrollWidth = currentValues.scrollWidth;
        const currentDate = currentValues.currentDate;

        currentValues.scrollWidth = value;
        currentValues.scrollOffsetLeft = -2 * currentValues.LIST_RANGE * value;
        // currentValues.speedScrollX = 0;
        currentValues.scrollX = currentValues.scrollX === undefined ?
          limitScrollX(getScrollXByOffset(0, currentValues), currentValues) :
          scrollWidth > 0 ? limitScrollX(currentValues.scrollX * value / scrollWidth, currentValues) : 0;
        currentValues.currentDate = getCurrentDate(currentValues);
        currentValues.scrollX = correctScrollX(currentDate, currentValues);

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
      get: () => currentValues.scrollX,
      set: (value) => {
        value = limitScrollX(value, currentValues);
        if (value === currentValues.scrollX) {
          // currentValues.speedScrollX = 0;
          return;
        }

        const currentDate = currentValues.currentDate;

        // currentValues.speedScrollX = currentValues.scrollX - value;
        currentValues.scrollX = value;
        currentValues.currentDate = getCurrentDate(currentValues);
        currentValues.scrollX = correctScrollX(currentDate, currentValues);

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
    //   get: () => currentValues.speedScrollX
    // },

    /**
     * смещение скрола по оси Y
     * @type {number}
     * @public
     */
    scrollY: {
      enumerable: true,
      get: () => currentValues.scrollY,
      set: (value) => {
        value = limitScrollY(value, currentValues)
        if (value !== currentValues.scrollY) {
          currentValues.scrollY = value;
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
      value: currentValues.LIST_RANGE
    },

    /**
     * Рабочие часы в сутках
     * @type {string}
     * @public
     */
    hoursOfDay: {
      enumerable: true,
      get: () => currentValues.hoursOfDay,
      set: (value) => {
        const list = value.split(',').map(Number).filter(item => (item >= 0 && item <= 23));
        list.sort((a, b) => (a - b));
        value = list.join(',');

        if (value !== currentValues.hoursOfDay) {
          currentValues.hoursOfDay = value;
          currentValues.DAYMS = list.length * HOURMS;
          currentValues.GRID_HOURS = toObject(list);
          currentValues.INTERVALS = createIntervals(list);
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
      get: () => currentValues.DAYMS
    },

    /**
     * Объект соответствия рабочего часа с реальным положением в сетке
     * @type {Object}
     * @public
     * @readonly
     */
    GRID_HOURS: {
      enumerable: true,
      get: () => currentValues.GRID_HOURS
    },

    /**
     * Рабочие интервалы в сутках
     * @type {Object}
     * @public
     * @readonly
     */
    INTERVALS: {
      enumerable: true,
      get: () => currentValues.INTERVALS
    },

    /**
     * количество дней в одном элементе InfiniteList
     * @type {number}
     * @public
     */
    gridDaysListItemSize: {
      enumerable: true,
      get: () => currentValues.gridDaysListItemSize,
      set: (value) => {
        currentValues.gridDaysListItemSize = value;
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
      get: () => currentValues.currentDate,
      set: (value) => {
        currentValues.currentDate = value;
        currentValues.scrollX = limitScrollX(getScrollXByOffset(0, currentValues), currentValues);
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
      get: () => currentValues.weekends,
      set: (value) => {
        currentValues.weekends = value;
        isChangedValues = true;
      }
    },

    /**
     * Начинать неделю с дня
     * @type {number}
     * @public
     */
    beginningOfWeek: {
      enumerable: true,
      get: () => currentValues.beginningOfWeek,
      set: (value) => {
        currentValues.beginningOfWeek = value;
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
      get: () => currentValues.hideWeekends,
      set: (value) => {
        value = Boolean(value);
        if (value !== currentValues.hideWeekends) {
          currentValues.hideWeekends = value;
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
      const scrollX = currentValues.scrollX;
      const scrollWidth = currentValues.scrollWidth;
      const LIST_RANGE = currentValues.LIST_RANGE;
      const min = getScrollXByOffset(offset, currentValues);
      const max = min - scrollWidth;

      return scrollX !== undefined && !Boolean(
        max >= scrollX / LIST_RANGE ||
        min <= scrollX - scrollWidth * LIST_RANGE
      );
    },

    timeToRate (time) {
      const hour = time / HOURMS ^ 0;
      const ms = time % HOURMS;
      const grid = currentValues.GRID_HOURS[ hour ] * HOURMS + ms;
      return Math.round(1000 * 100 * grid / currentValues.DAYMS) / 1000;
    }
  };
}

function getCurrentDate ({ currentDate, scrollX, scrollOffsetLeft, scrollOffsetRight, LIST_RANGE, gridDaysListItemSize }) {
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

  // FIXME setDate зависит от типа сетки
  // gridDaysListItemSize может быть плавающим в зависимости от рабочих дней
  return do {
    if (rate <= -(rateCompare)) {
      offsetDay(currentDate, gridDaysListItemSize);
    } else if (rate >= rateCompare) {
      offsetDay(currentDate, -(gridDaysListItemSize));
    } else {
      currentDate;
    }
  };
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
