import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import arr2obj from '../../utils/arr2obj';

import styles from './index.less';

export default class GridDaysItem extends StoreComponent {
  transformState (props, context) {
    const { currentDate, weekends, hideWeekends, hoursOfDay } = context.store.getState();
    return { currentDate, weekends, hideWeekends, hoursOfDay };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||
      this.props.listOffset !== nextProps.listOffset ||

      this.state.currentDate !== nextState.currentDate ||
      this.state.hideWeekends !== nextState.hideWeekends ||
      this.state.weekends !== nextState.weekends ||
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  getItems () {
    const datetime = this.context.datetime;
    const { listOffset, itemSize, ItemComponent } = this.props;
    const { currentDate, weekends, hideWeekends, hoursOfDay } = this.state;
    const weekendsObj = weekends ? arr2obj(weekends.split(',')) : {};

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;
    let idxLocal = 0; // local index minimizes redraw

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      const weekend = weekendsObj.hasOwnProperty(datetime.getDay(date));

      if (!weekend || !hideWeekends) {
        items.push(
          <ItemComponent
            key={idxLocal}
            date={date}
            weekend={weekend}
            hoursOfDay={hoursOfDay} />
        );
        idxLocal++;
      }
    }

    return items;
  }

  render () {
    return (
      <div className={styles.calendar_GridDaysItem}>
        {this.getItems()}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
GridDaysItem.propTypes = {
  ItemComponent: PropTypes.function,
  itemSize: PropTypes.number,
  listOffset: PropTypes.number
};
/* @endif */

GridDaysItem.defaultProps = {
  itemSize: 0,
  listOffset: 0
};
