// @flow
import GridStore from './GridStore';
import InfiniteStore from './InfiniteStore';
import { idle } from './Component/lazy';

export default class DateVisible {
  _grid: ?GridStore;
  _infinite: ?InfiniteStore;

  constructor (grid: GridStore, infinite: InfiniteStore) {
    this._grid = grid;
    this._infinite = infinite;

    this._grid.addChangeListener(this._handleChange, this);
    this._infinite.addChangeListener(this._handleChange, this);
  }

  destroy () {
    if (this._grid) {
      this._grid.removeChangeListener(this._handleChange, this);
      this._grid = null;
    }

    if (this._infinite) {
      this._infinite.removeChangeListener(this._handleChange, this);
      this._infinite = null;
    }
  }

  @idle
  _handleChange () {
    
  }
}
