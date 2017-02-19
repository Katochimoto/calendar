export default function createState () {
  const currentValues = {
    scrollHeight: 0,
    scrollWidth: 0,
    scrollOffsetLeft: 0,
    scrollOffsetRight: 0,
    scrollOffsetTop: 0,
    scrollOffsetBottom: 0,
    scrollX: undefined,
    scrollY: 0,

    listOffset: 0,
    listRange: 1,

    //stickyScrollX: false,   // ? залипающий скролл по X
    //stepScrollX: false,     // ? пошаговый скролл по X
    //freeScrollX: false,     // ? свободный скролл по X
    //freeScrollY: false,     // ? свободный скролл по Y

    //speedScrollX: 0,        // ? скорость скролла по X: старт = abs(new) > abs(old); вправо > 0; влево < 0;
    //speedScrollY: 0,        // ? скорость скролла по Y: старт = abs(new) > abs(old); вниз > 0; вверх < 0;

    //gridHeight: 0,
    //viewportHeight: 0,
    //viewportMinutesBegin: 0,
    //viewportMinutesEnd: 0,

    gridDaysListItemSize: 7,  // !! количество дней в одном элементе InfiniteList
    //gridWeekListItemSize: 1,  // количество недель в одном элементе InfiniteList


    //grid: 'day',
    //currentDate: new Date(),

    hoursOfDay: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23'
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
        currentValues.scrollY = scrollHeight > 0 ? limitScrollY(currentValues.scrollY * value / scrollHeight) : 0;

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
        currentValues.scrollOffsetLeft = -2 * state.listRange * value;
        currentValues.scrollX = currentValues.scrollX === undefined ?
          limitScrollX(-1 * state.listRange * state.scrollWidth) :
          scrollWidth > 0 ? limitScrollX(currentValues.scrollX * value / scrollWidth) : 0;
        currentValues.listOffset = getListOffset(currentValues);
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

        isChangedValues = true;
      }
    },

    /**
     * максимальное смещение при скроле влево = -1 * scrollWidth * ( listRange * 2 )
     * @type {number}
     * @private
     */
    scrollOffsetLeft: {
      get: () => currentValues.scrollOffsetLeft
    },

    /**
     * максимальное смещение при скроле вправо
     * @constant {number}
     * @private
     */
    scrollOffsetRight: {
      value: currentValues.scrollOffsetRight
    },

    /**
     * максимальное смещение при скроле вверх = -1 * scrollHeight
     * @type {number}
     * @private
     */
    scrollOffsetTop: {
      get: () => currentValues.scrollOffsetTop
    },

    /**
     * максимальное смещение при скроле вниз
     * @constant {number}
     * @private
     */
    scrollOffsetBottom: {
      value: currentValues.scrollOffsetBottom
    },

    /**
     * смещение скрола по оси X = -1 * listRange * scrollWidth
     * @type {number}
     * @public
     */
    scrollX: {
      enumerable: true,
      get: () => currentValues.scrollX,
      set: (value) => {
        value = limitScrollX(value);
        if (value === currentValues.scrollX) {
          return;
        }

        const listOffset = currentValues.listOffset;

        currentValues.scrollX = value;
        currentValues.listOffset = getListOffset(currentValues);
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

        isChangedValues = true;
      }
    },

    /**
     * смещение скрола по оси Y
     * @type {number}
     * @public
     */
    scrollY: {
      enumerable: true,
      get: () => currentValues.scrollY,
      set: (value) => {
        value = limitScrollY(value)
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
     */
    listRange: {
      enumerable: true,
      value: currentValues.listRange
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
        currentValues.scrollX = correctScrollX(listOffset, currentValues);

        isChangedValues = true;
      }
    },

    /**
     * Набор часов, выводимых в сетке на день и неделю
     * @type {string}
     * @public
     */
    hoursOfDay: {
      enumerable: true,
      get: () => currentValues.hoursOfDay,
      set: (value) => {
        currentValues.hoursOfDay = value;
        isChangedValues = true;
      }
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
    }
  });

  function limitScrollY (value) {
    return limitScroll(value, state.scrollOffsetTop, state.scrollOffsetBottom);
  }

  function limitScrollX (value) {
    return limitScroll(value, state.scrollOffsetLeft, state.scrollOffsetRight);
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

  function correctScrollX (oldListOffset, { scrollX, scrollWidth, listOffset, listRange }) {
    if (oldListOffset === listOffset) {
      return scrollX;
    }

    const diff = listOffset - oldListOffset;
    const newScrollX = do {
      if (Math.abs(diff) > listRange) {
        -1 * listRange * scrollWidth;
      } else {
        scrollX + diff * scrollWidth;
      }
    };

    return limitScrollX(newScrollX);
  }

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
    }
  };
}