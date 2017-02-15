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
    const len = hoursOfDay.length - 1;

    if (len < 0) {
      return null;
    }

    const elements = [];

    for (let i = 0; i < len; i++) {
      const hour = hoursOfDay[ i ];

      elements.push(
        <div key={hour}
          className={styles.calendar_DayHours_Item}
          data-hour={hours[ hour ].title} />
      );
    }

    const hour = hoursOfDay[ len ];

    elements.push(
      <div key={hour}
        className={styles.calendar_DayHours_Item}
        data-hour={hours[ hour ].title}
        data-next-hour={hours[ hoursOfDay[0] ].title} />
    );

    return (
      <div className={styles.calendar_DayHours}>
        {elements}
      </div>
    );
  }
}

/*
for (let i = 0; i < len; i++) {
  const hour = hoursOfDay[ i ];

  elements.push(
    <tr key={hour} className={styles.calendar_DayHours_Item}>
      <td className={styles.calendar_DayHours_Content}>
        <span className={styles.calendar_DayHours_Current}>{hours[ hour ].title}</span>
      </td>
    </tr>
  );
}

const hour = hoursOfDay[ len ];

elements.push(
  <tr key={hour} className={styles.calendar_DayHours_Item}>
    <td className={styles.calendar_DayHours_Content}>
      <span className={styles.calendar_DayHours_Current}>{hours[ hour ].title}</span>
    </td>
  </tr>
);

return (
  <table className={styles.calendar_DayHours}>
    <tbody>
      {elements}
    </tbody>
  </table>
);
 */
