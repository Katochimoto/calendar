// @flow

import { qlazy } from './decorators/lazy';
import EventEmitter from './EventEmitter';
import EventsStrategyDefault from './Events/EventsStrategyDefault';

interface EventsStrategy extends EventEmitter {
  getById (id: string): ?Object;
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
    this._strategy = strategy || (new EventsStrategyDefault: EventsStrategy);
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
