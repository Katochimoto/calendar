import classnames from 'classnames';
import styles from './index.less';

export default function MonthWeekDay ({ date, isCurrentDate, isWeekend }, { datetime }) {
  const odate = datetime.parseDate(date);
  const monthDate = odate.getDate();
  const weekDay = odate.getDay();
  const isFirstDay = monthDate === 1;

  const classes = classnames({
    [ styles.MonthWeekDay ]: true,
    [ styles.MonthWeekDay__current ]: isCurrentDate,
    [ styles.MonthWeekDay__first ]: isFirstDay,
    [ styles.MonthWeekDay__weekend ]: isWeekend,
  });

  const monthName = do {
    if (isFirstDay) {
      datetime.monthNameGenShort(date);
    } else {
      null;
    }
  };

  return (
    <div className={classes}>
      <span className={styles.MonthWeekDay_DateTitle}>
        <span className={styles.MonthWeekDay_Date}>
          {monthDate}
        </span>
        {monthName}
      </span>
    </div>
  );
}
