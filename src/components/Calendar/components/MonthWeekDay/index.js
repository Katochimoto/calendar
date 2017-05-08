import classnames from 'classnames';
import styles from './index.less';

export default function MonthWeekDay ({
  date,
  isCurrentDate,
  isWeekend,
}, {
  datetime,
  store
}) {

  const odate = datetime.parseDate(date);
  const monthDate = odate.getDate();
  const weekDay = odate.getDay();
  const isFirstDay = monthDate === 1;

  const classes = classnames({
    [ styles.MonthWeekDay ]: true,
    [ styles.MonthWeekDay__weekend ]: isWeekend,
    [ styles.MonthWeekDay__othermonth ]: !store.isCurrentMonthDate(date),
  });

  const classesDateTitle = classnames({
    [ styles.MonthWeekDay_DateTitle ]: true,
    [ styles.MonthWeekDay_DateTitle__current ]: isCurrentDate,
  });

  const classesDate = classnames({
    [ styles.MonthWeekDay_Date ]: true,
    [ styles.MonthWeekDay_Date__current ]: isCurrentDate,
  });

  const monthName = do {
    if (isFirstDay) {
      (
        <span className={styles.MonthWeekDay_Month}>
          {datetime.monthNameGenShort(date)}
        </span>
      );
    } else {
      null;
    }
  };

  return (
    <div className={classes}>
      <span className={classesDateTitle}>
        <span className={classesDate}>
          {monthDate}
        </span>
        {monthName}
      </span>
    </div>
  );
}
