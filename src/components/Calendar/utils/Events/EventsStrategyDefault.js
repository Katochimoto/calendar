// @flow

import { lazy } from '../Component/lazy';
import EventEmitter from '../EventEmitter';

export default class EventsStrategyDefault extends EventEmitter {
  getById (id: string): ?Object {}

  getByInterval (interval: number[]): Array<Object> {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const data = [
      {
        id: `${dateBegin}T03:30:00--${dateEnd}T07:30:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (3 * 60 + 30) * 60 * 1000,
        timeEnd: (7 * 60 + 30) * 60 * 1000,
        title: `${dateBegin} 1`
      },
      {
        id: `${dateBegin}T06:00:00--${dateEnd}T09:00:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (6 * 60) * 60 * 1000,
        timeEnd: (9 * 60) * 60 * 1000,
        title: `${dateBegin} 2`
      },
      {
        id: `${dateBegin}T07:30:00--${dateEnd}T10:00:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (7 * 60 + 30) * 60 * 1000,
        timeEnd: (10 * 60) * 60 * 1000,
        title: `${dateBegin} 3`
      },
      {
        id: `${dateBegin}T11:00:00--${dateEnd}T12:30:00`,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        timeBegin: (11 * 60) * 60 * 1000,
        timeEnd: (12 * 60 + 30) * 60 * 1000,
        title: `${dateBegin} 4`
      }
    ];

    return data;
  }

  @lazy
  uploadByInterval (interval: number[]): void {
    setTimeout(() => {
      this.emitChange();
    }, 500);
  }
}
