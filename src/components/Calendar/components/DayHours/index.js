/**
 *
 */

import { Component } from '../../Component';

import styles from './index.less';

export default class DayHours extends Component {

  shouldComponentUpdate () { // nextProps, nextState
    return false;
    /*
    return (
      this.state.hideNonWorkingHours !== nextState.nextState.hideNonWorkingHours ||
      this.state.hours !== nextState.nextState.hours ||
      this.state.hoursOfDay !== nextState.nextState.hoursOfDay
    );
    */
  }

  transformState ({ hideNonWorkingHours, hours, hoursOfDay }) {
    return { hideNonWorkingHours, hours, hoursOfDay };
  }

  render () {
    const { hoursOfDay, hours /* hideNonWorkingHours */ } = this.state;
    const len = hoursOfDay.length;

    if (!len) {
      return null;
    }

    const elements = [];
    let i = 0;

    while (i < len) {
      const hour = hoursOfDay[ i ];

      elements.push(
        <div key={i}
          className={styles.calendar_DayHours_Item}
          data-hour={hours[ hour ].title} />
      );

      i++;
    }

    elements.push(
      <div key={i}
        className={styles.calendar_DayHours_Item}
        data-hour={hours[ hoursOfDay[0] ].title} />
    );

    return (
      <div className={styles.calendar_DayHours}>
        {elements}
      </div>
    );
  }
}
