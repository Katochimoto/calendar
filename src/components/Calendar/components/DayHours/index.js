/**
 *
 */

import { Component } from '../../Component';

import styles from './index.less';

export default class DayHours extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.hours !== nextState.hours ||
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  transformState ({ hours, hoursOfDay }) {
    return { hours, hoursOfDay };
  }

  getItems () {
    const hoursOfDay = this.state.hoursOfDay.split(',');
    const hours = this.state.hours;
    const len = hoursOfDay.length;

    if (!len) {
      return null;
    }

    const items = [];

    for (let i = 0; i < len; i++) {
      const hour = hoursOfDay[ i ];

      items.push(
        <div key={hour}
          className={styles.calendar_DayHours_Item}
          data-hour={hours[ hour ].title} />
      );
    }

    const hour = hoursOfDay[ 0 ];

    items.push(
      <div key={`next-${hour}`}
        className={styles.calendar_DayHours_Item}
        data-hour={hours[ hour ].title} />
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
