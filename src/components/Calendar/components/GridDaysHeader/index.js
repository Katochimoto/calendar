/**
 *
 */

import { Component } from '../../Component';
import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';
import arr2obj from '../../utils/arr2obj';

import styles from './index.less';

export default class GridDaysHeader extends Component {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ gridDaysListItemSize, currentDate, weekends, hideWeekends }) {
    return { gridDaysListItemSize, currentDate, weekends, hideWeekends };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize ||
      this.state.currentDate !== nextState.currentDate ||
      this.state.weekends !== nextState.weekends ||
      this.state.hideWeekends !== nextState.hideWeekends
    );
  }

  getItemElement (listOffset, itemSize) {
    const datetime = this.context.datetime;
    const currentDate = this.state.currentDate;
    const weekends = this.state.weekends ? arr2obj(this.state.weekends.split(',')) : {};
    const hideWeekends = this.state.hideWeekends;

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      const isWeekend = Boolean(weekends[ datetime.getDay(date) ]);

      if (!isWeekend || !hideWeekends) {
        items.push(
          <DayHeader key={date} date={date} weekend={isWeekend} />
        );
      }
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
