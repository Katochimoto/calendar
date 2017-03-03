import context from '../../context';
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
        title: `${dateBegin}`
      }
    ];

    return data;
  }

  uploadByInterval (interval) {
    context.setTimeout(() => {
      this.emitChange();
    }, 500);
  }
}
