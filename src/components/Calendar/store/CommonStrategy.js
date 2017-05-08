import StoreStrategy from '../utils/StoreStrategy';
import stateGrid from './state/grid';
import stateInfinite from './state/infinite';
import stateVisible from './state/visible';
import { strategyGrid, strategyGridConstructor } from './decorators/strategyGrid';
import { strategyGridDay, strategyGridDayConstructor } from './decorators/strategyGridDay';
import { strategyGridMonth, strategyGridMonthConstructor } from './decorators/strategyGridMonth';
import { strategyInfinite, strategyInfiniteConstructor } from './decorators/strategyInfinite';
import { strategyInfiniteX, strategyInfiniteXConstructor } from './decorators/strategyInfiniteX';
import { strategyInfiniteY, strategyInfiniteYConstructor } from './decorators/strategyInfiniteY';
import { strategyVisible, strategyVisibleConstructor } from './decorators/strategyVisible';

const defaultState = {
  ...stateGrid,
  ...stateInfinite,
  ...stateVisible
};

@strategyVisible
@strategyGridDay
@strategyGrid
@strategyInfiniteX
@strategyInfinite
export class GridDayStrategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    strategyGridConstructor.call(this);
    strategyGridDayConstructor.call(this);
    strategyInfiniteConstructor.call(this);
    strategyInfiniteXConstructor.call(this);
    strategyVisibleConstructor.call(this);
  }
}

@strategyVisible
@strategyGridMonth
@strategyGrid
@strategyInfiniteY
@strategyInfinite
export class GridMonthStrategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    strategyGridConstructor.call(this);
    strategyGridMonthConstructor.call(this);
    strategyInfiniteConstructor.call(this);
    strategyInfiniteYConstructor.call(this);
    strategyVisibleConstructor.call(this);
  }
}
