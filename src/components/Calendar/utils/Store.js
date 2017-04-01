import EventEmitter from './EventEmitter';
import createState from './Store/createState';
import { getDay, HOURMS } from './date';

export default class Store extends EventEmitter {
  constructor (data) {
    super();
    this._state = createState();
    this._state.update(data);
  }

  update (data) {
    if (this._state.update(data)) {
      this.emitChange();
    }
  }

  getState () {
    return this._state.state;
  }

  isVisibleOffset (offset) {
    return this._state.isVisibleOffset(offset);
  }

  gridDateOffset (date, offset) {
    return this._state.gridDateOffset(date, offset);
  }

  timeToRate (time) {
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this._state.state.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this._state.state.DAYMS) / 1000;
  }

  checkWeekend (date) {
    return (getDay(date) in this._state.state.WEEKENDS_SET);
  }
}
