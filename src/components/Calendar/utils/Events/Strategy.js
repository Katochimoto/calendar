// @flow

import { lazy } from '../decorators/lazy';
import EventEmitter from '../EventEmitter';
import Event from './Event';

let state = [];

window.getStateEvents = () => state;

export default class Strategy extends EventEmitter {
  getById (id: string): ?Object {}

  getByInterval (interval: number[]): Array<Object> {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const checkInInterval = (item) => (
      item.dateBegin >= dateBegin &&
      item.dateBegin <= dateEnd
    );

    let idx = state.findIndex(checkInInterval);

    // FIXME remove later
    if (idx === -1) {
      fillStateSamples(dateBegin, dateEnd);
      idx = state.findIndex(checkInInterval);
    }

    return {
      next () {
        const event = state[idx];

        if (!event || !checkInInterval(event)) {
          return { done: true };
        }

        idx++;

        return {
          done: false,
          value: event
        };
      }
    };
  }

  @lazy
  uploadByInterval (interval: number[]): void {
    setTimeout(() => {
      this.emitChange();
    }, 500);
  }
}

function fillStateSamples (dateBegin, dateEnd) {
  const data = [
    {
      id: `${dateBegin}T03:30:00--${dateEnd}T07:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (3 * 60 + 30) * 60 * 1000,
      timeEnd: (7 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 1`,
      UPDATED: Math.random() + 1
    },
    {
      id: `${dateBegin}T06:00:00--${dateEnd}T09:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (6 * 60) * 60 * 1000,
      timeEnd: (9 * 60) * 60 * 1000,
      title: `${dateBegin} 2`,
      UPDATED: Math.random() + 2
    },
    {
      id: `${dateBegin}T07:30:00--${dateEnd}T10:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (7 * 60 + 30) * 60 * 1000,
      timeEnd: (10 * 60) * 60 * 1000,
      title: `${dateBegin} 3`,
      UPDATED: Math.random() + 3
    },
    {
      id: `${dateBegin}T11:00:00--${dateEnd}T12:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (11 * 60) * 60 * 1000,
      timeEnd: (12 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 4`,
      UPDATED: Math.random() + 4
    }
  ].map(item => Event.create(item));

  state = state.concat(data);
  state.sort((a, b) => {
    if (a.dateBegin > b.dateBegin) {
      return 1;
    } else if (a.dateBegin < b.dateBegin) {
      return -1;
    } else {
      if (a.timeBegin > b.timeBegin) {
        return 1;
      } else if (a.timeBegin < b.timeBegin) {
        return -1;
      } else {
        return 0;
      }
    }
  });
}
