/**
 *
 */

import { Component } from '../../Component';

import styles from './index.less';

export default class DayHours extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  transformState ({ hoursOfDay }) {
    return { hoursOfDay };
  }

  getItems () {
    if (!this.state.hoursOfDay) {
      return null;
    }

    const items = [];
    const hoursOfDay = this.state.hoursOfDay.split(',');

    for (let i = 0, len = hoursOfDay.length; i < len; i++) {
      const hour = hoursOfDay[ i ];

      items.push(
        <div key={hour}
          className={styles.calendar_DayHours_Item}
          data-hour={this.context.datetime.getHourTitle(hour)} />
      );
    }

    const hour = hoursOfDay[ 0 ];

    items.push(
      <div key={`next-${hour}`}
        className={styles.calendar_DayHours_Item}
        data-hour={this.context.datetime.getHourTitle(hour)} />
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
