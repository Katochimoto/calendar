import EventEmitter from '../EventEmitter';

export const EVENT_DATA = Symbol('event-data');
export const EVENT_NEXT = Symbol('event-next');
export const EVENT_PREV = Symbol('event-prev');

export default class Event extends EventEmitter {

  static create (data: {[id:string]: any}): Event {
    return new Event(data);
  }

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

  get (name) {
    return this[ EVENT_DATA ][ name ];
  }

  // @deprecated
  getData () {
    return this[ EVENT_DATA ];
  }

  next (): ?Event {
    return this[ EVENT_NEXT ];
  }

  prev (): ?Event {
    return this[ EVENT_PREV ];
  }

  valueOf () {
    return this[ EVENT_DATA ] && this[ EVENT_DATA ].UPDATED;
  }

  toString () {
    return String(this.valueOf() || '');
  }

  isBeginInInterval (interval: number[]) {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const evtDateBegin = this[ EVENT_DATA ].dateBegin;

    return (
      evtDateBegin >= dateBegin &&
      evtDateBegin <= dateEnd
    );
  }
}
