const DEFAULT_STATE = {
  scrollHeight: 0,
  scrollWidth: 0,
  scrollX: 0,
  scrollY: 0,
  stopTransition: false,

  listKey: 0,

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

const changeCallbacks = [];

function Store () {
  this._state = DEFAULT_STATE;
}

Store.prototype = {
  init (state) {
    Object.assign(this._state, state);
  },

  update (state) {
    Object.assign(this._state, state);

    for (let i = 0, len = changeCallbacks.length; i < len; i++) {
      const [ callback, ctx ] = changeCallbacks[i];
      callback.call(ctx);
    }
  },

  getState () {
    return this._state;
  },

  addChangeListener (callback, ctx) {
    changeCallbacks.push([ callback, ctx ]);
  },

  removeChangeListener (callback, ctx) {
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
};

export default new Store();
