import objectAssign from 'object-assign';

const DEFAULT_STATE = {
  scrollHeight: 0,
  scrollWidth: 0,
  scrollOffsetLeft: 0,    // максимальное смещение при скроле влево = -1 * scrollWidth * ( listRange * 2 )
  scrollOffsetRight: 0,   // максимальное смещение при скроле вправо = constant 0
  scrollOffsetTop: 0,     // максимальное смещение при скроле вверх = -1 * scrollHeight
  scrollOffsetBottom: 0,  // максимальное смещение при скроле вниз = constant 0
  scrollX: undefined,     // смещение скрола по оси X = -1 * listRange * scrollWidth
  scrollY: 0,

  stickyScrollX: false,   // ? залипающий скролл по X
  stepScrollX: false,     // ? пошаговый скролл по X
  freeScrollX: false,     // ? свободный скролл по X
  freeScrollY: false,     // ? свободный скролл по Y

  speedScrollX: 0,        // ? скорость скролла по X: старт = abs(new) > abs(old); вправо > 0; влево < 0;
  speedScrollY: 0,        // ? скорость скролла по Y: старт = abs(new) > abs(old); вниз > 0; вверх < 0;

  listOffsetRate: 0,      // смещение скрола от центра экрана в процентах
  listOffset: 0,          // смещение начала списка. смещение определяется интервалами InfiniteList
  listRange: 1,           // количество предзагружаемых заранее интервалов InfiniteList слева и справа от текущего

  gridHeight: 0,
  viewportHeight: 0,
  viewportMinutesBegin: 0,
  viewportMinutesEnd: 0,

  gridDaysListItemSize: 7,  // количество дней в одном элементе InfiniteList
  gridWeekListItemSize: 1,  // количество недель в одном элементе InfiniteList


  grid: 'day',
  currentDate: new Date(),
  hours: {
    0: { title: '00:00' },
    1: { title: '01:00' },
    2: { title: '02:00' },
    3: { title: '03:00' },
    4: { title: '04:00' },
    5: { title: '05:00' },
    6: { title: '06:00' },
    7: { title: '07:00' },
    8: { title: '08:00' },
    9: { title: '09:00' },
    10: { title: '10:00' },
    11: { title: '11:00' },
    12: { title: '12:00' },
    13: { title: '13:00' },
    14: { title: '14:00' },
    15: { title: '15:00' },
    16: { title: '16:00' },
    17: { title: '17:00' },
    18: { title: '18:00' },
    19: { title: '19:00' },
    20: { title: '20:00' },
    21: { title: '21:00' },
    22: { title: '22:00' },
    23: { title: '23:00' },
  },
  hoursOfDay: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23', // набор часов, выводимых в сетке на день и неделю
  hideNonWorkingHours: true,
};

export default function Store (newState) {
  this.state = objectAssign({}, DEFAULT_STATE);
  this.getter = new Getter(this);
  this.changeCallbacks = [];

  objectAssign(this.state, newState, this._calculateState(newState));
}

Store.prototype = {
  update (newState) {
    const oldListOffset = this.state.listOffset;
    const oldScrollX = this.state.scrollX;

    objectAssign(this.state, newState, this._calculateState(newState));

    const newListOffset = this.state.listOffset;

    if (oldListOffset !== newListOffset) {
      const diff = newListOffset - oldListOffset;

      if (Math.abs(diff) > this.state.listRange) {
        this.state.scrollX = -1 * this.state.listRange * this.state.scrollWidth;

      } else {
        this.state.scrollX = oldScrollX + diff * this.state.scrollWidth;
      }
    }

    for (let i = 0, len = this.changeCallbacks.length; i < len; i++) {
      const [ callback, ctx ] = this.changeCallbacks[i];
      callback.call(ctx);
    }
  },

  getState () {
    return this.state;
  },

  addChangeListener (callback, ctx) {
    this.changeCallbacks.push([ callback, ctx ]);
  },

  removeChangeListener (callback, ctx) {
    let i = 0;
    while (i < this.changeCallbacks.length) {
      const item = this.changeCallbacks[i];

      if (item[0] === callback && item[1] === ctx) {
        this.changeCallbacks.splice(i, 1);

      } else {
        i++;
      }
    }
  },

  limitScrollX (value) {
    return _limitScroll(value, this.state.scrollOffsetLeft, this.state.scrollOffsetRight);
  },

  limitScrollY (value) {
    return _limitScroll(value, this.state.scrollOffsetTop, this.state.scrollOffsetBottom);
  },

  _calculateState (newState) {
    return {
      scrollOffsetLeft: this.getter.scrollOffsetLeft(newState),
      scrollOffsetTop: this.getter.scrollOffsetTop(newState),
      scrollX: this.getter.scrollX(newState),
      scrollY: this.getter.scrollY(newState),
      listOffset: this.getter.listOffset(newState)
    };
  }
};

function Getter (store) {
  this.store = store;
}

Getter.prototype = {
  _getter (value, data, getter) {
    return data[ value ] !== undefined ?
      data[ value ] : getter ?
      getter.call(this, data) : this.store.state[ value ];
  },

  listRange (data) {
    return this._getter('listRange', data);
  },

  scrollWidth (data) {
    return this._getter('scrollWidth', data);
  },

  scrollHeight (data) {
    return this._getter('scrollHeight', data);
  },

  scrollOffsetBottom (data) {
    return this._getter('scrollOffsetBottom', data);
  },

  scrollOffsetRight (data) {
    return this._getter('scrollOffsetRight', data);
  },

  scrollOffsetTop (data) {
    return data.scrollHeight === undefined ?
      this._getter('scrollOffsetTop', data) :
      -1 * data.scrollHeight;
  },

  scrollOffsetLeft (data) {
    return data.scrollWidth === undefined && data.listRange === undefined ?
      this._getter('scrollOffsetLeft', data) :
      -2 * this.listRange(data) * this.scrollWidth(data);
  },

  scrollY (data) {
    let scrollY = this._getter('scrollY', data);

    if (data.scrollHeight !== undefined && data.scrollHeight !== this.store.state.scrollHeight) {
      scrollY = this.store.state.scrollHeight > 0 ? scrollY * data.scrollHeight / this.store.state.scrollHeight : 0;
    }

    return _limitScroll(scrollY, this.scrollOffsetTop(data), this.scrollOffsetBottom(data));
  },

  scrollX (data) {
    let scrollX = this._getter('scrollX', data);

    if (scrollX === undefined) {
      const scrollWidth = this.scrollWidth(data);

      if (scrollWidth) {
        scrollX = -1 * this.listRange(data) * scrollWidth;
      }
    }

    return scrollX === undefined ? scrollX :
      _limitScroll(scrollX, this.scrollOffsetLeft(data), this.scrollOffsetRight(data));
  },

  listOffsetRate (data) {
    return this._getter('listOffsetRate', data, function (data) {

    });
  },

  listOffset (data) {
    return this._getter('listOffset', data, function (data) {
      const scrollY = this.scrollX(data);
      const scrollOffsetLeft = this.scrollOffsetLeft(data);
      const scrollOffsetRight = this.scrollOffsetRight(data);
      const scrollOffsetCenter = (scrollOffsetLeft + scrollOffsetRight) / 2;
      const scrollOffsetWidth = scrollOffsetLeft > scrollOffsetRight ?
        scrollOffsetLeft - scrollOffsetRight :
        scrollOffsetRight - scrollOffsetLeft;
      const centerOffsetWidth = scrollOffsetWidth / 2;
      const sign = scrollY > scrollOffsetCenter ? 1 : -1;
      const scrollY2CenterWidth = scrollY > scrollOffsetCenter ?
        scrollY - scrollOffsetCenter :
        scrollOffsetCenter - scrollY;
      const rate = centerOffsetWidth ? sign * scrollY2CenterWidth * 100 / centerOffsetWidth : 0;

      let listOffset = this.store.state.listOffset;
      if (rate <= -100) {
        listOffset++;
      } else if (rate >= 100) {
        listOffset--;
      }

      return listOffset;
    })
  }
};

function _limitScroll (value, min, max) {
  return Math.round(value < min ? min : value > max ? max : value);
}

function _scrollXOffset (data, offset) {

}
