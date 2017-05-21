import classnames from 'classnames';

import styles from './index.less';
import gridStyles from '../../style/Grid.less';

export default function MonthWeekEvents () {
  const classes = classnames({
    [ styles.MonthWeekEvents ]: true,
    [ gridStyles.Grid ]: true
  });

  return (
    <div className={classes}>

    </div>
  );
}

/*
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc1} ${styles.MonthWeekEvent_ec2} ${styles.MonthWeekEvent_sr1}`}>
  <div className={styles.MonthWeekEvent_Content}>event 1</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc2} ${styles.MonthWeekEvent_ec3} ${styles.MonthWeekEvent_sr2}`}>
  <div className={styles.MonthWeekEvent_Content}>event 2</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc3} ${styles.MonthWeekEvent_ec4} ${styles.MonthWeekEvent_sr3}`}>
  <div className={styles.MonthWeekEvent_Content}>event 3</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc4} ${styles.MonthWeekEvent_ec5} ${styles.MonthWeekEvent_sr4}`}>
  <div className={styles.MonthWeekEvent_Content}>event 4</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc5} ${styles.MonthWeekEvent_ec6} ${styles.MonthWeekEvent_sr5}`}>
  <div className={styles.MonthWeekEvent_Content}>event 5</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc6} ${styles.MonthWeekEvent_ec7} ${styles.MonthWeekEvent_sr1}`}>
  <div className={styles.MonthWeekEvent_Content}>event 6</div>
</div>
<div className={`${styles.MonthWeekEvent} ${styles.MonthWeekEvent_sc7} ${styles.MonthWeekEvent_sr2}`}>
  <div className={styles.MonthWeekEvent_Content}>event 7</div>
</div>
*/
