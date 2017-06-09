// @flow

import { qlazy } from './decorators/lazy';
import EventEmitter from './EventEmitter';
import Strategy from './Events/Strategy';

interface EventsStrategy extends EventEmitter {
  getByInterval (interval: number[]): Array<Object>;
  uploadByInterval (interval: number[]): void;
}

/**
 * @param {EventsStrategy} strategy
 */
export default class Events extends EventEmitter {
  _strategy: EventsStrategy;

  constructor (strategy: ?EventsStrategy) {
    super();
    this._strategy = strategy || (new Strategy: EventsStrategy);
    this._strategy.addChangeListener(this._handleChangeEventsStrategy, this);
  }

  getByInterval (interval: number[]): Array<Object> {
    return this._strategy.getByInterval(interval);
  }

  uploadByInterval (interval: number[]): Function {
    return qlazy(() => this._strategy.uploadByInterval(interval));
  }

  _handleChangeEventsStrategy () {
    this.emitChange();
  }
}
