// @flow

import { lazy } from '../decorators/lazy';
import { mergeIntervals } from '../date';
import EventEmitter from '../EventEmitter';
import Event from './Event';

const EVENTS_STRATEGY_STATE = Symbol('events-strategy-state');

export default class Strategy extends EventEmitter {
  constructor () {
    super();
    this[ EVENTS_STRATEGY_STATE ] = [];
  }

  first (): ?Event {

  }

  last (): ?Event {

  }

  firstByInterval (interval: number[], current = this.first()): ?Event {
    let item;
    let toFirst = true;

    while (current) {
      const compare = current.compareBeginInInterval(interval);

      if (compare === -1) {
        current = current.next();
        toFirst = false;
      } else if (compare === 1) {
        current = current.prev();
        toFirst = true;
      } else if (toFirst) {
        const prev = current.prev();
        if (prev) {
          current = prev;
        } else {
          item = current;
          break;
        }
      } else {
        item = current;
        break;
      }
    }

    current = undefined;
    return item;
  }

  getByInterval (interval: number[]): Object {
    let item = this.firstByInterval(interval);

    return {
      next () {
        const data = { done: true };

        if (item && item.isBeginInInterval(interval)) {
          data.done = false;
          data.value = item;
          item = item.next();
        }

        return data;
      }
    };
  }

  @lazy
  uploadByInterval (intervals: Array<Number[]>): void {
    const interval = mergeIntervals(intervals);

    /*setTimeout(() => {
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

      this.emitChange();
    }, 500);*/
  }
}

function fillStateSamples (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;

  const data = [
    {
      id: `${dateBegin}T03:30:00--${dateEnd}T07:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (3 * 60 + 30) * 60 * 1000,
      timeEnd: (7 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 1`,
      updated: Math.random() + 1
    },
    {
      id: `${dateBegin}T06:00:00--${dateEnd}T09:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (6 * 60) * 60 * 1000,
      timeEnd: (9 * 60) * 60 * 1000,
      title: `${dateBegin} 2`,
      updated: Math.random() + 2
    },
    {
      id: `${dateBegin}T07:30:00--${dateEnd}T10:00:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (7 * 60 + 30) * 60 * 1000,
      timeEnd: (10 * 60) * 60 * 1000,
      title: `${dateBegin} 3`,
      updated: Math.random() + 3
    },
    {
      id: `${dateBegin}T11:00:00--${dateEnd}T12:30:00`,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      timeBegin: (11 * 60) * 60 * 1000,
      timeEnd: (12 * 60 + 30) * 60 * 1000,
      title: `${dateBegin} 4`,
      updated: Math.random() + 4
    }
  ].map(item => new Event(item));

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