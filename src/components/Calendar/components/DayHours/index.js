/**
 *
 */

import { StoreComponent } from '../../Component';

import styles from './index.less';

export default class DayHours extends StoreComponent {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  transformState (props, context) {
    const { hoursOfDay } = context.store.getState();
    return { hoursOfDay };
  }

  getItems () {
    if (!this.state.hoursOfDay) {
      return null;
    }

    const datetime = this.context.datetime;
    const hoursOfDay = this.state.hoursOfDay.split(',');
    const items = [];

    for (let i = 0, len = hoursOfDay.length; i < len; i++) {
      const hour = hoursOfDay[ i ];

      items.push(
        <div key={hour}
          className={styles.calendar_DayHours_Item}
          data-hour={datetime.gridDaysHourTitle(hour)} />
      );
    }

    const hour = hoursOfDay[ 0 ];

    items.push(
      <div key={`next-${hour}`}
        className={styles.calendar_DayHours_Item}
        data-hour={datetime.gridDaysHourTitle(hour)} />
    );

    return items;
  }

  render () {
    return (
      <div className={styles.calendar_DayHours}>
        {this.getItems()}
      </div>
    );
  }
}
