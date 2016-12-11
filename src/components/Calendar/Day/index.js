/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component } from 'react';
import moment from 'moment';
import DayEvents from '../DayEvents';

import styles from '../index.less';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.date = moment();
  }

  getHour(hour) {
    return this.date.set({ hour, minute: 0 }).format('LT');
  }

  hours() {
    const items = [];
    const cache = {};

    for (let i = 0; i < 24; i++) {
      const hour = cache[ i ] = this.getHour(i);
      const nextIdx = i === 23 ? 0 : i + 1;
      const nextHour = cache[ nextIdx ] || (cache[ nextIdx ] = this.getHour(nextIdx));

      items.push(<div key={hour} className={ styles.calendar_hour } data-hour={hour} data-next-hour={nextHour} />);
    }

    return items;
  }

  render() {
    return (
      <div className={ styles.calendar_day_wrap }>
        <div className={ styles.calendar_day }>
          {this.hours()}
        </div>
        <DayEvents />
      </div>
    );
  }
}
