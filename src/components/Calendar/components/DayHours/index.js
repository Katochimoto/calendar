/**
 *
 */

import { Component, PropTypes } from 'react';
import moment from 'moment';

import styles from '../../style';

export default class DayHours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHoursItems() {
    const items = [];
    const cache = {};
    const date = moment();

    for (let i = 0; i < 24; i++) {
      const hour = cache[ i ] = hourFormat(date, i);
      const nextIdx = i === 23 ? 0 : i + 1;
      const nextHour = cache[ nextIdx ] || (cache[ nextIdx ] = hourFormat(date, nextIdx));

      items.push(
        <div key={i}
          className={styles.calendar_DayHours_item}
          data-hour={hour}
          data-next-hour={nextHour} />
      );
    }

    return items;
  }

  getLinesItems() {
    const items = [];

    for (let i = 0; i < 24; i++) {
      items.push(
        <div key={i} className={styles.calendar_DayHours_item} />
      );
    }

    return items;
  }

  render() {
    const items = do {
      if (this.props.clockShow) {
        this.getHoursItems();
      } else {
        this.getLinesItems();
      }
    };

    return (
      <div className={styles.calendar_DayHours}>
        {items}
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.clockShow показывать часы
 */
DayHours.propTypes = {
  clockShow: PropTypes.bool
};

DayHours.defaultProps = {
  clockShow: true
};

function hourFormat(date, hour) {
  return date.set({ hour, minute: 0 }).format('LT');
}
