import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class GridDaysItem extends StoreComponent {
  transformState (props, context) {
    const { weekends, hideWeekends, hoursOfDay } = context.store.getState();
    return { weekends, hideWeekends, hoursOfDay };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.props.itemSize !== nextProps.itemSize ||

      this.state.hideWeekends !== nextState.hideWeekends ||
      this.state.weekends !== nextState.weekends ||
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  getItems () {
    const { store } = this.context;
    const { date, itemSize, ItemComponent } = this.props;
    const { hoursOfDay, hideWeekends } = this.state;
    const items = [];

    let idx = 0;
    let idxLocal = 0; // local index minimizes redraw

    while (idx < itemSize) {
      const itemDate = store.gridDateOffset(date, idx);
      const isWeekend = store.checkWeekend(itemDate);

      if (!isWeekend || !hideWeekends) {
        items.push(
          <ItemComponent
            key={idxLocal}
            date={itemDate}
            weekend={isWeekend}
            hoursOfDay={hoursOfDay} />
        );

        idxLocal++;
      }

      idx++;
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
  date: PropTypes.number
};
/* @endif */

GridDaysItem.defaultProps = {
  itemSize: 0,
  date: 0
};
