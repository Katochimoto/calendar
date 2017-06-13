// @flow

import EventEmitter from '../EventEmitter';

export const EVENT_DATA = Symbol('event-data');
export const EVENT_NEXT = Symbol('event-next');
export const EVENT_PREV = Symbol('event-prev');

const F_UPDATED = 'updated';
const F_DATE_BEGIN = 'dateBegin';

export default class Event extends EventEmitter {
  constructor (data: {[id:string]: any}) {
    super();
    this[ EVENT_DATA ] = data;
    this[ EVENT_NEXT ] = null;
    this[ EVENT_PREV ] = null;
  }

  destroy () {
    super.destroy();
    this[ EVENT_DATA ] = null;
    this[ EVENT_NEXT ] = null;
    this[ EVENT_PREV ] = null;
  }

  get (name: String) {
    return this[ EVENT_DATA ] && this[ EVENT_DATA ][ name ];
  }

  next (): ?Event {
    return this[ EVENT_NEXT ];
  }

  prev (): ?Event {
    return this[ EVENT_PREV ];
  }

  valueOf () {
    return this.get(F_UPDATED);
  }

  toString () {
    return String(this.valueOf() || '');
  }

  compareBeginInInterval (interval: number[]): number {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const evtDateBegin = this.get(F_DATE_BEGIN);

    return do {
      if (evtDateBegin < dateBegin) {
        -1;
      } else if (evtDateBegin > dateEnd) {
        1;
      } else {
        0;
      }
    };
  }

  isBeginInInterval (interval: number[]): boolean {
    return this.compareBeginInInterval(interval) === 0;
  }

  firstByInterval (interval: number[]): ?Event {
    let item;
    let toFirst = true;
    let current = this;

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
}
