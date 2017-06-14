// @flow

import { lazy } from '../decorators/lazy';
import { mergeIntervals, offsetOnDay } from '../date';
import EventEmitter from '../EventEmitter';
import Event, { EVENT_NEXT, EVENT_PREV } from './Event';

const EVENTS_STRATEGY_STATE = Symbol('events-strategy-state');
const EVENTS_STRATEGY_FIRST = Symbol('events-strategy-first');
const EVENTS_STRATEGY_LAST = Symbol('events-strategy-last');

export default class Strategy extends EventEmitter {
  constructor () {
    super();
    this[ EVENTS_STRATEGY_STATE ] = [];
    this[ EVENTS_STRATEGY_FIRST ] = null;
    this[ EVENTS_STRATEGY_LAST ] = null;
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

    setTimeout(() => {
      let item = this.current() && this.current().firstByInterval(interval);

      if (!item) {
        const events = generateEvents(interval);
        this[ EVENTS_STRATEGY_STATE ] = this[ EVENTS_STRATEGY_STATE ].concat(events);

        this.emitChange();
      }
    }, 500);
  }
}

function generateEvents (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const events = [];
  let currentDate = dateBegin;

  while (currentDate <= dateEnd) {
    events.push(
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate])
    );
    currentDate = offsetOnDay(currentDate, 1);
  }

  events.forEach(function (item, idx, events) {
    item[ EVENT_PREV ] = events[idx - 1] || null;
    item[ EVENT_NEXT ] = events[idx + 1] || null;
  });

  return events;
}

function generateEvent (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const timeBegin = getRandomInt(0, 23 * 60);
  const timeEnd = getRandomInt(timeBegin + 30, 24 * 60);

  return new Event({
    id: `${dateBegin}T${timeBegin}--${dateEnd}T${timeEnd}`,
    dateBegin: dateBegin,
    dateEnd: dateEnd,
    timeBegin: timeBegin * 60 * 1000,
    timeEnd: timeEnd * 60 * 1000,
    title: `${dateBegin} ${timeBegin}:${timeEnd}`,
    updated: Math.random() + 1
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
