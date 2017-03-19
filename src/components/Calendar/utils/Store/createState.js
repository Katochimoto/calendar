import arr2obj from '../arr2obj';
import createIntervals from '../createIntervals';
import { HOURMS } from '../../constant';

const HOURS = '0,1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23'; //,7,8
const HOURS_LIST = HOURS.split(',').map(Number);
const INTERVALS = createIntervals(HOURS_LIST);
const DAYMS = HOURS_LIST.length * HOURMS;
const GRID_HOURS = arr2obj(HOURS_LIST);

export default function createState () {
  const currentValues = {
    scrollHeight: 0,
    scrollWidth: 0,

    /**
     * максимальное смещение при скроле влево = -1 * scrollWidth * ( LIST_RANGE * 2 )
     * @type {number}
     * @private
     * @readonly
     */
    scrollOffsetLeft: 0,

    /**
     * максимальное смещение при скроле вправо
     * @constant {number}
     * @private
     * @readonly
     */
    scrollOffsetRight: 0,

    /**
     * максимальное смещение при скроле вверх = -1 * scrollHeight
     * @type {number}
     * @private
     * @readonly
     */
    scrollOffsetTop: 0,

    /**
     * максимальное смещение при скроле вниз
     * @constant {number}
     * @private
     * @readonly
     */
    scrollOffsetBottom: 0,
    scrollX: undefined,
    scrollY: 0,

    listOffset: 0,
    LIST_RANGE: 1,

    //stickyScrollX: false,   // ? залипающий скролл по X
    //stepScrollX: false,     // ? пошаговый скролл по X
    //freeScrollX: false,     // ? свободный скролл по X
    //freeScrollY: false,     // ? свободный скролл по Y

    //speedScrollX: 0,
    //speedScrollY: 0,        // ? скорость скролла по Y: старт = abs(new) > abs(old); вниз > 0; вверх < 0;

    //gridHeight: 0,
    //viewportHeight: 0,
    //viewportMinutesBegin: 0,
    //viewportMinutesEnd: 0,

    gridDaysListItemSize: 7,
    //gridWeekListItemSize: 1,  // количество недель в одном элементе InfiniteList


    //grid: 'day',
    currentDate: 2017.0227,
    hoursOfDay: HOURS,
    GRID_HOURS: GRID_HOURS,
    DAYMS: DAYMS,
    INTERVALS: INTERVALS,
    weekends: '0,6',
    hideWeekends: false,
    beginningOfWeek: 1
  };

  let isChangedValues = false;

  const state = Object.create(null);

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
        const listOffset = currentValues.listOffset;

        currentValues.scrollWidth = value;
        currentValues.scrollOffsetLeft = -2 * currentValues.LIST_RANGE * value;
        // currentValues.speedScrollX = 0;
        currentValues.scrollX = currentValues.scrollX === undefined ?
          limitScrollX(getScrollXByOffset(0, currentValues), currentValues) :
          scrollWidth > 0 ? limitScrollX(currentValues.scrollX * value / scrollWidth, currentValues) : 0;
        currentValues.listOffset = getListOffset(currentValues);
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

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

        const listOffset = currentValues.listOffset;

        // currentValues.speedScrollX = currentValues.scrollX - value;
        currentValues.scrollX = value;
        currentValues.listOffset = getListOffset(currentValues);
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

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
     * смещение начала списка. смещение определяется интервалами InfiniteList
     * @type {number}
     * @public
     */
    listOffset: {
      enumerable: true,
      get: () => currentValues.listOffset,
      set: (value) => {
        const listOffset = currentValues.listOffset;

        currentValues.listOffset = value;
        // currentValues.speedScrollX = 0;
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

        isChangedValues = true;
      }
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
          currentValues.GRID_HOURS = arr2obj(list);
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

    scrollXByOffset (listOffset) {
      return getScrollXByOffset(listOffset, currentValues);
    },

    timeToRate (time) {
      const hour = time / HOURMS ^ 0;
      const ms = time % HOURMS;
      const grid = currentValues.GRID_HOURS[ hour ] * HOURMS + ms;
      return Math.round(1000 * 100 * grid / currentValues.DAYMS) / 1000;
    }
  };
}

function getListOffset ({ listOffset, scrollX, scrollOffsetLeft, scrollOffsetRight }) {
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

  return do {
    if (rate <= -100) {
      ++listOffset;
    } else if (rate >= 100) {
      --listOffset;
    } else {
      listOffset;
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

function correctScrollX (oldListOffset, state) {
  const {
    listOffset,
    LIST_RANGE,
    scrollWidth,
    scrollX
  } = state;

  if (oldListOffset === listOffset) {
    return scrollX;
  }

  const diff = listOffset - oldListOffset;

  return do {
    if (Math.abs(diff) > LIST_RANGE) {
      limitScrollX(getScrollXByOffset(listOffset, state), state);
    } else {
      limitScrollX(scrollX + diff * scrollWidth, state);
    }
  };
}

function getScrollXByOffset (listOffset, { LIST_RANGE, scrollWidth }) {
  return (listOffset + 1) * -1 * LIST_RANGE * scrollWidth;
}
