import lazy from './lazy';
import EventEmitter from './EventEmitter';
import EventsStrategyDefault from './Events/EventsStrategyDefault';

/**
 * @param {EventsStrategy} strategy
 */
export default class Events extends EventEmitter {
  constructor (strategy) {
    super();
    this._strategy = strategy || new EventsStrategyDefault();
    this._strategy.addChangeListener(this._handleChangeEventsStrategy, this);
  }

  getByInterval (interval) {
    return this._strategy.getByInterval(interval);
  }

  uploadByInterval (interval) {
    return lazy(() => this._strategy.uploadByInterval(interval));
  }

  _handleChangeEventsStrategy () {
    this.emitChange();
  }
}
