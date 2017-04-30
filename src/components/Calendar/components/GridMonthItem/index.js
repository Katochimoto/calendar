import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import { WEEKDAYS } from '../../utils/date';

import MonthWeek from '../MonthWeek';
import styles from './index.less';

export default class GridMonthItem extends StoreComponent {

  transformState (props, context) {
    const {
      hideWeekends,
      weekends,
    } = context.store.getState();

    return {
      hideWeekends,
      weekends,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const state = this.state;
    const props = this.props;

    return (
      props.date !== nextProps.date ||
      props.itemSize !== nextProps.itemSize ||
      props.offset !== nextProps.offset ||
      state.hideWeekends !== nextState.hideWeekends ||
      state.weekends !== nextState.weekends
    );
  }

  getItems () {
    const store = this.context.store;
    const { date, itemSize, offset } = this.props;
    const { hideWeekends, weekends } = this.state;
    const items = [];

    let idx = 0;

    while (idx < itemSize) {
      const itemDate = store.gridDateOffset(date, idx * WEEKDAYS);

      items.push(
        <MonthWeek
          key={idx}
          date={itemDate}
          offset={offset}
          hideWeekends={hideWeekends}
          weekends={weekends} />
      );

      idx++;
    }

    return items;
  }

  render () {
    return (
      <div className={styles.GridMonthItem}>
        {this.getItems()}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
GridMonthItem.propTypes = {
  date: PropTypes.number,
  itemSize: PropTypes.number,
  offset: PropTypes.number,
};
/* @endif */

GridMonthItem.defaultProps = {
  date: 0,
  itemSize: 0,
  offset: 0,
};
