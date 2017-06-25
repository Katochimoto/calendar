// @flow

import { lazy } from '../decorators/lazy';
import { mergeIntervals } from '../date';
import EventEmitter from '../EventEmitter';
import Event from './Event';

export default class Strategy extends EventEmitter {
  _current: ?Event;
  _state: { [string]: ?Event };
  _update: Function;
  _upload: Function;

  constructor ({
    upload = () => { },
    update = () => { }
  } = {}) {
    super();
    this._state = Object.create(null);
    this._current = null;
    this._upload = upload;
    this._update = update;
  }

  destroy () {
    super.destroy();

    for (const eventId in this._state) {
      const event: Event = this._state[ eventId ];
      if (event) {
        event.destroy();
      }
    }

    this._state = Object.create(null);
    this._current = null;
    this._upload = () => { };
    this._update = () => { };
  }

  getEventInstance(data: Object | Event): Event {
    if (data instanceof Event) {
      return data;
    }

    const newEvent: Event = new Event(data);
    const eventId: string = newEvent.getId();
    const prevEvent: Event = this._state[ eventId ];

    if (prevEvent) {
      if (prevEvent.valueOf() === newEvent.valueOf()) {
        return prevEvent;
      } else {
        this.destroyEventInstance(prevEvent);
      }
    }

    this._state[ eventId ] = newEvent;
    return newEvent;
  }

  destroyEventInstance (event: Event) {
    this._state[ event.getId() ] = undefined;
    event.destroy();
  }

  getByInterval (interval: number[]): Object {
    let item = this._current && this._current.firstByInterval(interval);

    return {
      next () {
        const data = { done: true, value: undefined };

        if (item && item.isBeginInInterval(interval)) {
          data.done = false;
          data.value = item;
          item = item.next();
        }

        return data;
      }
    };
  }

  clearByInterval (interval: number[]): [ ?Event, ?Event ] {
    // TODO
    // prevByInterval()
    // nextByInterval()
    // this._current = ...

    const iterator = this.getByInterval(interval);

    let result = iterator.next();
    let first = result.value && result.value.prev() || null;
    let last = null;

    while (result && !result.done) {
      last = result.value.next();
      result = iterator.next();
    }

    if (first) {
      first._next = last;
    }

    if (last) {
      last._prev = first;
    }

    return [ first, last ];
  }

  @lazy
  uploadByInterval (intervals: Array<number[]>): void {
    const interval = mergeIntervals(intervals);
    this._upload(interval, this._uploadCallback);
  }

  _uploadCallback (error: ?Object, interval: number[], data: Array<Object>) {
    if (error || !data.length) {
      return;
    }

    const [ first, last ] = this.clearByInterval(interval);

    const events: Array<Event> = data
      .map(this.getEventInstance, this)
      .map(createEventLinks);

    if (first) {
      first._next = events[0];
    }

    if (last) {
      last._prev = events[events.length - 1];
    }

    this._current = events[0];
    this.emitChange();
  }
}

function createEventLinks(event: Event, idx: number, events: Array<Event>): Event {
  event._prev = events[idx - 1] || null;
  event._next = events[idx + 1] || null;
  return event;
}
