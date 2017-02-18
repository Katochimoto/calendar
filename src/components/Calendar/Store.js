import limitScroll from './utils/limitScroll';
import getListOffset from './utils/getListOffset';

export default function Store (data) {
  const { state, update } = createState();
  this._state = state
  this._update = update;
  this._callbacks = [];

  update(data);
}

Store.prototype = {
  update (data) {
    if (this._update(data)) {
      for (let i = 0, len = this._callbacks.length; i < len; i++) {
        const item = this._callbacks[i];
        item[0].call(item[1]);
      }
    }
  },

  getState () {
    return this._state;
  },

  addListener (callback, ctx) {
    this._callbacks.push([ callback, ctx ]);
  },

  removeListener (callback, ctx) {
    let i = 0;
    while (i < this._callbacks.length) {
      const item = this._callbacks[i];

      if (item[0] === callback && item[1] === ctx) {
        this._callbacks.splice(i, 1);

      } else {
        i++;
      }
    }
  }
};

function createState () {
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
        const scrollY = currentValues.scrollY;
        const scrollHeight = currentValues.scrollHeight;

        currentValues.scrollHeight = value;
        currentValues.scrollOffsetTop = -1 * value;
        currentValues.scrollY = limitScrollY(scrollHeight > 0 ? scrollY * value / scrollHeight : 0);

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
        const scrollX = currentValues.scrollX;
        const scrollWidth = currentValues.scrollWidth;
        const listOffset = currentValues.listOffset;

        currentValues.scrollWidth = value;
        currentValues.scrollOffsetLeft = -2 * state.listRange * value;
        currentValues.scrollX = scrollX === undefined ?
          limitScrollX(-1 * state.listRange * state.scrollWidth) :
          limitScrollX(scrollWidth > 0 ? scrollX * value / scrollWidth : 0);
        currentValues.listOffset = getListOffset(currentValues);

        if (listOffset !== currentValues.listOffset) {
          const diff = currentValues.listOffset - listOffset;
          const newScrollX = do {
            if (Math.abs(diff) > state.listRange) {
              -1 * state.listRange * value;
            } else {
              scrollX + diff * value;
            }
          };

          currentValues.scrollX = limitScrollX(newScrollX);
        }

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
        if (value !== currentValues.scrollX) {
          const scrollX = currentValues.scrollX;
          const listOffset = currentValues.listOffset;

          currentValues.scrollX = value;
          currentValues.listOffset = getListOffset(currentValues);

          if (listOffset !== currentValues.listOffset) {
            const diff = currentValues.listOffset - listOffset;
            const newScrollX = do {
              if (Math.abs(diff) > state.listRange) {
                -1 * state.listRange * state.scrollWidth;
              } else {
                scrollX + diff * state.scrollWidth;
              }
            };

            currentValues.scrollX = limitScrollX(newScrollX);
          }

          isChangedValues = true;
        }
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

        if (listOffset !== currentValues.listOffset) {
          const diff = currentValues.listOffset - listOffset;
          const newScrollX = do {
            if (Math.abs(diff) > state.listRange) {
              -1 * state.listRange * state.scrollWidth;
            } else {
              currentValues.scrollX + diff * state.scrollWidth;
            }
          };

          currentValues.scrollX = limitScrollX(newScrollX);
          isChangedValues = true;
        }
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

  return {
    state,

    update (data) {
      isChangedValues = false;

      if (data) {
        //console.log('>>', data);
        for (const name in data) {
          if (data.hasOwnProperty(name) &&
            name in state &&
            data[ name ] !== state[ name ]) {

            state[ name ] = data[ name ];
          }
        }
        //console.log('<<', state, isChangedValues);
      }

      return isChangedValues;
    }
  };
}
