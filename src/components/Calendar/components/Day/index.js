/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component } from 'react';
import DayEvents from '../DayEvents';

import styles from '../../style';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hours() {
    const items = [];

    for (let i = 0; i < 24; i++) {
      items.push(<div key={i} className={ styles.calendar_day_hour } />);
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
