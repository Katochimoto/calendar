/**
 *
 */

import { Component } from '../../Component';
import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysHeader extends Component {
  /*constructor (props, context) {
    super(props, context);
  }*/

  transformState ({ gridDaysListItemSize }) {
    return { gridDaysListItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize
    );
  }

  /**
   * @this {InfiniteList}
   */
  getItemElement (listOffset, itemSize) {
    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      items.push(
        <DayHeader key={idx} />
      );
    }

    return (
      <div className={styles.calendar_GridDaysHeader_Item}>
        {items}
      </div>
    );
  }

  render () {
    return (
      <div className={styles.calendar_GridDaysHeader}>
        <div className={styles.calendar_GridDaysHeader_Content}>
          <InfiniteList
            getItemElement={this.getItemElement}
            itemSize={this.state.gridDaysListItemSize} />
        </div>
      </div>
    );
  }
}
