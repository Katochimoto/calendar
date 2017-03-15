import context from '../../context';
import { lazy } from '../lazy';
import EventsStrategy from './EventsStrategy';

export default class EventsStrategyDefault extends EventsStrategy {
  constructor () {
    super();
    this._state = [];
  }

  getByInterval (interval) {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const data = [
      {
        id: `${dateBegin}T07:30:00--${dateEnd}T11:30:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (7 * 60 + 30) * 60 * 1000,
        timeEnd: (11 * 60 + 30) * 60 * 1000,
        title: `${dateBegin} 1`
      },
      {
        id: `${dateBegin}T10:00:00--${dateEnd}T13:00:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (10 * 60) * 60 * 1000,
        timeEnd: (13 * 60) * 60 * 1000,
        title: `${dateBegin} 2`
      },
      {
        id: `${dateBegin}T11:30:00--${dateEnd}T14:00:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (11 * 60 + 30) * 60 * 1000,
        timeEnd: (14 * 60) * 60 * 1000,
        title: `${dateBegin} 3`
      }
    ];

    return data;
  }

  @lazy
  uploadByInterval (interval) {
    context.setTimeout(() => {
      this.emitChange();
    }, 500);
  }
}
