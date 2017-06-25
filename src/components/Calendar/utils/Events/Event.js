// @flow

import EventEmitter from '../EventEmitter';

const F_ID = 'id';
const F_UPDATED = 'updated';
const F_DATE_BEGIN = 'dateBegin';

export default class Event extends EventEmitter {
  _data: ?Object;
  _next: ?Event;
  _prev: ?Event;

  constructor (data: {[id:string]: any}) {
    super();
    this._data = data;
    this._next = null;
    this._prev = null;
  }

  destroy () {
    super.destroy();
    this._data = null;
    this._next = null;
    this._prev = null;
  }

  get (name: String): any {
    return this._data && this._data[ name ];
  }

  getId (): string {
    return this.get(F_ID);
  }

  next (): ?Event {
    return this._next;
  }

  prev (): ?Event {
    return this._prev;
  }

  valueOf (): any {
    return this.get(F_UPDATED);
  }

  toString (): string {
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

  first (): ?Event {
    let item;
    let current = this;

    do {
      item = current;
      current = current.prev();
    } while (current);

    return item;
  }

  last (): ?Event {
    let item;
    let current = this;

    do {
      item = current;
      current = current.next();
    } while (current);

    return item;
  }

  firstByInterval (interval: number[]): ?Event {
    let item;
    let toFirst = true;
    let current = this;

    while (current && !item) {
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
        }
      } else {
        item = current;
      }
    }

    return item;
  }

  prevByInterval (interval: number[]): ?Event {

  }

  nextByInterval (interval: number[]): ?Event {

  }
}
