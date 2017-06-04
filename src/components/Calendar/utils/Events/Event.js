import EventEmitter from '../EventEmitter';

const EVENT_DATA = Symbol('event-data');
const EVENT_NEXT = Symbol('event-next');
const EVENT_PREV = Symbol('event-prev');

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

  get (name) {
    return this[ EVENT_DATA ][ name ];
  }

  getData () {
    return this[ EVENT_DATA ];
  }

  next (): Event {
    return this[ EVENT_NEXT ];
  }

  prev (): Event {
    return this[ EVENT_PREV ];
  }

  setNext (evt: Event) {
    this[ EVENT_NEXT ] = evt;
  }

  setPrev (evt: Event) {
    this[ EVENT_PREV ] = evt;
  }

  valueOf () {
    return this[ EVENT_DATA ].UPDATED;
  }

  toString () {
    return String(this[ EVENT_DATA ].UPDATED);
  }

  isBeginInInterval (interval: number[]) {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;

    return (
      this[ EVENT_DATA ].dateBegin >= dateBegin &&
      this[ EVENT_DATA ].dateBegin <= dateEnd
    );
  }
}
