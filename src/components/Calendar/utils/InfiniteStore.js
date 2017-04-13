import EventEmitter from './EventEmitter';
import StoreStrategy from './StoreStrategy';
import StrategyX from './InfiniteStore/StrategyX';

import {
  EV_INFINITE_NEXT,
  EV_INFINITE_PREV,
} from '../constant';

export default class InfiniteStore extends EventEmitter {
  _strategy: StoreStrategy;

  constructor (strategy: StoreStrategy) {
    super();
    this._setStrategy(strategy || (new StrategyX: StoreStrategy));
  }

  setStrategy (strategy: StoreStrategy) {
    this._setStrategy(strategy);
    // this.emitChange();
  }

  getState () {
    return this._strategy.state;
  }

  update (data: {[id:string]: any}) {
    this._strategy.update(data) && this.emitChange();
  }

  forceUpdated () {
    this._strategy.forceUpdated() && this.emitChange();
  }

  updateScroll (deltaX: number, deltaY: number) {
    this._strategy.updateScroll(deltaX, deltaY) && this.emitChange();
  }

  isVisibleOffset (offset: number): boolean {
    return this._strategy.isVisibleOffset(offset);
  }

  _proxyNextEvent () {
    this.emitSync(EV_INFINITE_NEXT);
  }

  _proxyPrevEvent () {
    this.emitSync(EV_INFINITE_PREV);
  }

  _setStrategy (strategy: StoreStrategy) {
    this._strategy && this._strategy.destroy();
    this._strategy = strategy;
    this._strategy.addListener(EV_INFINITE_NEXT, this._proxyNextEvent, this);
    this._strategy.addListener(EV_INFINITE_PREV, this._proxyPrevEvent, this);
  }
}
