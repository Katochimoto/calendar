import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import arr2obj from '../../utils/arr2obj';

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
    const datetime = this.context.datetime;
    const { date, itemSize, ItemComponent } = this.props;
    const { hoursOfDay } = this.state;
    const items = [];

    //const { weekends, hideWeekends, hoursOfDay } = this.state;
    //const weekendsObj = weekends ? arr2obj(weekends.split(',')) : {};

    let idx = 0;

    while (idx < itemSize) {
      items.push(
        <ItemComponent
          key={idx}
          date={datetime.offsetDay(date, idx)}
          weekend={false}
          hoursOfDay={hoursOfDay} />
      );

      idx++;
    }


    /*
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;
    let idxLocal = 0; // local index minimizes redraw

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(, idx);
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
    */

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
