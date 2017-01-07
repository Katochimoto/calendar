/**
 *
 */

import Component from '../../Component';

import styles from '../../style';

export default class DayHours extends Component {
  transformState (storeState) {
    const { hideNonWorkingHours, hours, hoursOfDay } = storeState;
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
        <div key={hour} className={styles.calendar_DayHours_item}>
          <div className={styles.calendar_DayHours_item_content}
            data-hour={hours[ hour ].title} />
        </div>
      );
    }

    const hour = hoursOfDay[ len ];

    elements.push(
      <div key={hour} className={styles.calendar_DayHours_item}>
        <div className={styles.calendar_DayHours_item_content}
          data-hour={hours[ hour ].title}
          data-next-hour={hours[ hoursOfDay[0] ].title}/>
      </div>
    );

    return (
      <div className={styles.calendar_DayHours}>
        {elements}
      </div>
    );
  }
}
