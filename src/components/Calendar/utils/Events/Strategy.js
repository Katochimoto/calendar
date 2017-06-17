// @flow

import { lazy } from '../decorators/lazy';
import { mergeIntervals } from '../date';
import EventEmitter from '../EventEmitter';
import Event, { EVENT_NEXT, EVENT_PREV } from './Event';

export default class Strategy extends EventEmitter {
  constructor ({
    upload = () => {},
    update = () => {}
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
      const event = this._state[ eventId ];
      if (event) {
        event.destroy();
      }
    }

    this._state = Object.create(null);
    this._current = null;
    this._upload = null;
    this._update = null;
  }

  getEventInstance (data) {
    if (data instanceof Event) {
      return data;
    }

    const newEvent = new Event(data);
    const eventId = newEvent.getId();
    const prevEvent = this._state[ eventId ];

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

  clearByInterval (interval: number[]) {
    const iterator = this.getByInterval(interval);

    let result = iterator.next();
    let first = result.value && result.value.prev() || null;
    let last = null;

    while (result && !result.done) {
      const event = result.value;
      last = event.next();
      this.destroyEventInstance(event);
      result = iterator.next();
    }

    if (first) {
      first[ EVENT_NEXT ] = last;
    }

    if (last) {
      last[ EVENT_PREV ] = first;
    }

    return [ first, last ];
  }

  @lazy
  uploadByInterval (intervals: Array<Number[]>): void {
    const interval = mergeIntervals(intervals);
    this._upload(interval, this._uploadCallback);
  }

  _uploadCallback (error, interval, events) {
    if (error || !events.length) {
      return;
    }

    const [ first, last ] = this.clearByInterval(interval);

    events = events
      .map(this.getEventInstance, this)
      .map(createEventLinks);

    if (first) {
      first[ EVENT_NEXT ] = events[0];
    }

    if (last) {
      last[ EVENT_PREV ] = events[events.length - 1];
    }

    this._current = events[0];
    this.emitChange();
  }
}

function createEventLinks (event, idx, events) {
  event[ EVENT_PREV ] = events[idx - 1] || null;
  event[ EVENT_NEXT ] = events[idx + 1] || null;
  return event;
}
