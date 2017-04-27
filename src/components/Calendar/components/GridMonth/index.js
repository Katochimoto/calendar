import { Component } from '../../utils/Component';
import StrategyY from '../../utils/InfiniteStore/StrategyY';
import wheel from '../../utils/Component/wheel';

import GridMonthContent from '../GridMonthContent';

import styles from './index.less';

@wheel
export default class GridMonth extends Component {
  constructor (props, context) {
    super(props, context);

    const state = { ...context.infiniteStore.getState() };
    state.scrollY = undefined;
    state.scrollX = undefined;
    context.infiniteStore.setStrategy(new StrategyY(state));
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
        className={styles.GridMonth}>

        <col width="100%" valign="top" />

        <thead>
          <tr>
            <td className={styles.GridMonth_Header}>
              1
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className={styles.GridMonth_Content}>
              <GridMonthContent />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
