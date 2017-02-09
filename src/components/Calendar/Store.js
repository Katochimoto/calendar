const DEFAULT_STATE = {
  scrollHeight: 0,
  scrollWidth: 0,
  scrollOffsetLeft: 0, // максимальное смещение при скроле влево = -1 * scrollWidth * ( listRange * 2 )
  scrollOffsetRight: 0, // максимальное смещение при скроле вправо = constant 0
  scrollOffsetTop: 0, // максимальное смещение при скроле вверх = -1 * scrollHeight
  scrollOffsetBottom: 0, // максимальное смещение при скроле вниз = constant 0
  scrollX: undefined, // смещение скрола по оси X = -1 * listRange * scrollWidth
  scrollY: 0,
  stopTransition: false,

  listOffset: 0,
  listRange: 1,

  gridHeight: 0,
  viewportHeight: 0,
  viewportMinutesBegin: 0,
  viewportMinutesEnd: 0,

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
  hoursOfDay: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ],
  hideNonWorkingHours: true,
};

const getter = {
  listRange: data => _getter('listRange', data),
  scrollWidth: data => _getter('scrollWidth', data),
  scrollHeight: data => _getter('scrollHeight', data),
  scrollOffsetBottom: data => _getter('scrollOffsetBottom', data),
  scrollOffsetRight: data => _getter('scrollOffsetRight', data),
  scrollOffsetTop: function (data) {
    return data.scrollHeight === undefined ?
      _getter('scrollOffsetTop', data) :
      -1 * data.scrollHeight;
  },
  scrollOffsetLeft: function (data) {
    return data.scrollWidth === undefined && data.listRange === undefined ?
      _getter('scrollOffsetLeft', data) :
      -2 * getter.scrollWidth(data) * getter.listRange(data);
  },
  scrollY: function (data) {
    let scrollY = _getter('scrollY', data);

    if (data.scrollHeight !== undefined && data.scrollHeight !== state.scrollHeight) {
      scrollY = state.scrollHeight > 0 ? scrollY * data.scrollHeight / state.scrollHeight : 0;
    }

    return _limitScrollY(scrollY, getter.scrollOffsetTop(data), getter.scrollOffsetBottom(data));
  },
  scrollX: function (data) {
    let scrollX = _getter('scrollX', data);

    if (scrollX === undefined) {
      const scrollWidth = getter.scrollWidth(data);

      if (scrollWidth) {
        scrollX = -1 * getter.listRange(data) * scrollWidth;
      }
    }

    return scrollX === undefined ? scrollX :
      _limitScrollX(scrollX, getter.scrollOffsetLeft(data), getter.scrollOffsetRight(data));
  }
};

const changeCallbacks = [];
const state = DEFAULT_STATE;

export default {
  init,
  update,
  getState,
  addChangeListener,
  removeChangeListener,
  limitScrollX: value => _limitScrollX(value),
  limitScrollY: value => _limitScrollY(value)
};

function init (newState) {
  Object.assign(state, newState, _calculateState(newState));
  //console.log(state);
}

function update (newState) {
  Object.assign(state, newState, _calculateState(newState));
  //console.log(state);
  fireChange();
}

function getState () {
  return state;
}

function fireChange () {
  for (let i = 0, len = changeCallbacks.length; i < len; i++) {
    const [ callback, ctx ] = changeCallbacks[i];
    callback.call(ctx);
  }
}

function addChangeListener (callback, ctx) {
  changeCallbacks.push([ callback, ctx ]);
}

function removeChangeListener (callback, ctx) {
  let i = 0;
  while (i < changeCallbacks.length) {
    const item = changeCallbacks[i];

    if (item[0] === callback && item[1] === ctx) {
      changeCallbacks.splice(i, 1);

    } else {
      i++;
    }
  }
}

function _calculateState (newState) {
  return {
    scrollOffsetLeft: getter.scrollOffsetLeft(newState),
    scrollOffsetTop: getter.scrollOffsetTop(newState),
    scrollX: getter.scrollX(newState),
    scrollY: getter.scrollY(newState)
  };
}

function _getter (value, data, _get = () => state[ value ]) {
  return data[ value ] !== undefined ? data[ value ] : _get(data);
}

function _limitScrollX (value, min = state.scrollOffsetLeft, max = state.scrollOffsetRight) {
  return Math.round(value < min ? min : value > max ? max : value);
}

function _limitScrollY (value, min = state.scrollOffsetTop, max = state.scrollOffsetBottom) {
  return Math.round(value < min ? min : value > max ? max : value);
}
