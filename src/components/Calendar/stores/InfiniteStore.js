import Store from './Store';
import StoreStrategy from './StoreStrategy';
import StrategyX from './InfiniteStore/StrategyX';
import StrategyY from './InfiniteStore/StrategyY';

export default class InfiniteStore extends Store {
  constructor (strategy: StoreStrategy) {
    super(strategy || (new StrategyX: StoreStrategy));
  }

  forceUpdated () {
    if (this._strategy.forceUpdated()) {
      this.emitChange();
    }
  }

  updateScrollByWheel (deltaX: number, deltaY: number) {
    if (this._strategy.updateScrollByWheel(deltaX, deltaY)) {
      this.emitChange();
    }
  }

  isVisibleOffset (offset: number): boolean {
    return this._strategy.isVisibleOffset(offset);
  }

  getVisibleRange () {
    return this._strategy.getVisibleRange();
  }

  switchStrategyX () {
    const state = { ...this.getState() };
    state.scrollY = undefined;
    state.scrollX = undefined;
    return this.setStrategy(new StrategyX(state));
  }

  switchStrategyY () {
    const state = { ...this.getState() };
    state.scrollY = undefined;
    state.scrollX = undefined;
    return this.setStrategy(new StrategyY(state));
  }
}
