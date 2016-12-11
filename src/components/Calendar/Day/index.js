/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component } from 'react';
import DayEvents from '../DayEvents';

import styles from '../index.less';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHour(hour) {
    return `${hour}:00`;
  }

  hours() {
    const items = [];

    for (let i = 0; i < 24; i++) {
      const hour = this.getHour(i);
      const nextHour = this.getHour(i === 23 ? 0 : i + 1);

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
