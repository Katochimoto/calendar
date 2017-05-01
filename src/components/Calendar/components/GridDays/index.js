import { Component } from '../../utils/Component';
import StrategyX from '../../utils/InfiniteStore/StrategyX';
import wheel from '../../utils/decorators/wheel';

import GridDaysHeader from '../GridDaysHeader';
import GridDaysContent from '../GridDaysContent';

import styles from './index.less';

@wheel
export default class GridDays extends Component {
  constructor (props, context) {
    super(props, context);
    const state = context.infiniteStore.getState();
    context.infiniteStore.setStrategy(new StrategyX(state));
  }

  shouldComponentUpdate () {
    return false;
  }

  handleWheel (deltaX, deltaY) {
    this.context.infiniteStore.updateScrollByWheel(deltaX, deltaY);
  }

  handleWheelStop () {
    this.context.infiniteStore.updateScrollByWheel(0, 0);
  }

  render () {
    return (
      <table ref={rootNode => this._rootNode = rootNode}
        className={styles.GridDays}>

        <col width="100%" valign="top" />

        <thead>
          <tr>
            <td className={styles.GridDays_Header}>
              <GridDaysHeader />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className={styles.GridDays_Content}>
              <GridDaysContent />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
