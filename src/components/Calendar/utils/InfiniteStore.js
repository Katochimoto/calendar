import EventEmitter from './EventEmitter';
import StoreStrategy from './StoreStrategy';
import StrategyX from './InfiniteStore/StrategyX';

export default class InfiniteStore extends EventEmitter {
  _strategy: StoreStrategy;

  constructor (strategy: StoreStrategy) {
    super();
    this._strategy = strategy || (new StrategyX: StoreStrategy);
    this._strategy.addListener('next', this._proxyNextEvent, this);
    this._strategy.addListener('prev', this._proxyPrevEvent, this);
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
    this.emitSync('next')
  }

  _proxyPrevEvent () {
    this.emitSync('prev')
  }
}
