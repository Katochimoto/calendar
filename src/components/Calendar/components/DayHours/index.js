/**
 *
 */

import styles from '../../style';

export default function DayHours ({ hoursOfDay, hours /* hideNonWorkingHours */ }) {
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
