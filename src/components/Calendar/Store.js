import EventEmitter from 'eventemitter3';
import update from 'react-addons-update';

class Store extends EventEmitter {
  constructor (state) {
    super();
    this._state = state;
  }

  init (state) {
    this._state = update(this._state, { $merge: state });
  }

  update (state) {
    this._state = update(this._state, { $merge: state });
    this.emit('change');
  }

  getState () {
    return this._state;
  }

  addChangeListener (callback, context) {
    return this.on('change', callback, context);
  }

  removeChangeListener (callback, context) {
    return this.removeListener('change', callback, context);
  }
}

export default new Store({
  grid: 'day',
  currentDate: new Date(),
  scrollX: 0,
  scrollY: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  calendarWidth: 0,
  calendarHeight: 0,
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
});
