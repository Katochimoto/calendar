// @flow

import { lazy } from '../decorators/lazy';
import EventEmitter from '../EventEmitter';
import Event from './Event';

let state = [];

window.getStateEvents = () => state;

export default class Strategy extends EventEmitter {
  getById (id: string): ?Object {}

  getByInterval (interval: number[]): Array<Object> {
    let idx = -1;
    for (let i = 0, len = state.length; i < len; i++) {
      if (state[i].isBeginInInterval(interval)) {
        idx = i;
        break;
      }
    }

    return {
      next () {
        const item = state[idx];

        if (!item || !(item.isBeginInInterval(interval))) {
          return { done: true };
        }

        idx++;

        return {
          done: false,
          value: item
        };
      }
    };
  }

  @lazy
  uploadByInterval (intervals: Array<Number[]>): void {
    // FIXME remove later
    setTimeout(() => {
      intervals.forEach((interval) => {
        let idx = -1;
        for (let i = 0, len = state.length; i < len; i++) {
          if (state[i].isBeginInInterval(interval)) {
            idx = i;
            break;
          }
        }

        if (idx === -1) {
          fillStateSamples(interval);
        }
      });

      this.emitChange();
    }, 500);
  }
}

function fillStateSamples (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;

  const data = [
    {
      ID: `${dateBegin}T03:30:00--${dateEnd}T07:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (3 * 60 + 30) * 60 * 1000,
      timeEnd: (7 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 1`,
      UPDATED: Math.random() + 1
    },
    {
      ID: `${dateBegin}T06:00:00--${dateEnd}T09:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (6 * 60) * 60 * 1000,
      timeEnd: (9 * 60) * 60 * 1000,
      title: `${dateBegin} 2`,
      UPDATED: Math.random() + 2
    },
    {
      ID: `${dateBegin}T07:30:00--${dateEnd}T10:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (7 * 60 + 30) * 60 * 1000,
      timeEnd: (10 * 60) * 60 * 1000,
      title: `${dateBegin} 3`,
      UPDATED: Math.random() + 3
    },
    {
      ID: `${dateBegin}T11:00:00--${dateEnd}T12:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (11 * 60) * 60 * 1000,
      timeEnd: (12 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 4`,
      UPDATED: Math.random() + 4
    }
  ].map(item => Event.create(item));

  state = state.concat(data);

  /*
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
  */
}
