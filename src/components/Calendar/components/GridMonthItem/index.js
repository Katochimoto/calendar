import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import MonthWeek from '../MonthWeek';
import styles from './index.less';

export default class GridMonthItem extends Component {

  shouldComponentUpdate (nextProps) {
    const props = this.props;

    return (
      props.date !== nextProps.date ||
      props.itemSize !== nextProps.itemSize
    );
  }

  getItems () {
    const store = this.context.store;
    const { date, itemSize, offset } = this.props;
    const items = [];

    let idx = 0;

    while (idx < 5) {
      const itemDate = store.gridDateOffset(date, idx * 7);

      items.push(
        <MonthWeek
          key={idx}
          date={itemDate}
          offset={offset} />
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
