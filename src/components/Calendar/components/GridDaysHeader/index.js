/**
 *
 */

import { Component } from '../../Component';
import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysHeader extends Component {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ gridDaysListItemSize, currentDate }) {
    return { gridDaysListItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  getItemElement (listOffset, itemSize) {
    const datetime = this.context.datetime;
    const currentDate = this.state.currentDate;

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      items.push(
        <DayHeader key={date} date={date} />
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
