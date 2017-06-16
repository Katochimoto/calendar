// @flow

import { lazy } from '../decorators/lazy';
import { mergeIntervals } from '../date';
import EventEmitter from '../EventEmitter';
import Event, { EVENT_NEXT, EVENT_PREV } from './Event';

const EVENTS_STRATEGY_STATE = Symbol('events-strategy-state');
const EVENTS_STRATEGY_FIRST = Symbol('events-strategy-first');
const EVENTS_STRATEGY_LAST = Symbol('events-strategy-last');
const EVENTS_STRATEGY_UPLOAD = Symbol('events-strategy-upload');
const EVENTS_STRATEGY_UPDATE = Symbol('events-strategy-update');

export default class Strategy extends EventEmitter {
  constructor ({
    upload = () => {},
    update = () => {}
  } = {}) {
    super();
    this[ EVENTS_STRATEGY_STATE ] = [];
    this[ EVENTS_STRATEGY_FIRST ] = null;
    this[ EVENTS_STRATEGY_LAST ] = null;
    this[ EVENTS_STRATEGY_UPLOAD ] = upload;
    this[ EVENTS_STRATEGY_UPDATE ] = update;
  }

  destroy () {
    super.destroy();
    this[ EVENTS_STRATEGY_STATE ] = [];
    this[ EVENTS_STRATEGY_FIRST ] = null;
    this[ EVENTS_STRATEGY_LAST ] = null;
    this[ EVENTS_STRATEGY_UPLOAD ] = null;
    this[ EVENTS_STRATEGY_UPDATE ] = null;
  }

  first (): ?Event {
    return this[ EVENTS_STRATEGY_STATE ][0];
  }

  last (): ?Event {
    return this[ EVENTS_STRATEGY_STATE ][this[ EVENTS_STRATEGY_STATE ].length - 1];
  }

  current (): ?Event {
    return this.first();
  }

  getByInterval (interval: number[]): Object {
    let item = this.current() && this.current().firstByInterval(interval);

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
    this[ EVENTS_STRATEGY_UPLOAD ](interval, (error, data) => {
      if (error) {

      } else {
        data = data
          .map(createEvent)
          .map(createEventLinks);

        // FIXME
        this[ EVENTS_STRATEGY_STATE ] = this[ EVENTS_STRATEGY_STATE ].concat(data);
        this.emitChange();
      }
    });
  }
}

function createEvent (item) {
  return new Event(item);
}

function createEventLinks (event, idx, events) {
  event[ EVENT_PREV ] = events[idx - 1] || null;
  event[ EVENT_NEXT ] = events[idx + 1] || null;
  return event;
}
