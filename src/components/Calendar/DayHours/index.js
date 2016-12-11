/**
 *
 */

import { Component } from 'react';
import moment from 'moment';

import styles from '../index.less';

export default class DayHours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hours() {
    const items = [];
    const cache = {};
    const date = moment();

    for (let i = 0; i < 24; i++) {
      const hour = cache[ i ] = hourFormat(date, i);
      const nextIdx = i === 23 ? 0 : i + 1;
      const nextHour = cache[ nextIdx ] || (cache[ nextIdx ] = hourFormat(date, nextIdx));

      items.push(<div key={i} className={ styles.calendar_days_hours_item } data-hour={hour} data-next-hour={nextHour} />);
    }

    return items;
  }

  render() {
    return (
      <div className={styles.calendar_days_hours}>
        {this.hours()}
      </div>
    );
  }
}

function hourFormat(date, hour) {
  return date.set({ hour, minute: 0 }).format('LT');
}
