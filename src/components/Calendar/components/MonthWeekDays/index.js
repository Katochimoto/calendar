import { WEEKDAYS } from '../../utils/date';

import MonthWeekDay from '../MonthWeekDay';
import styles from './index.less';

export default function MonthWeekDays ({ date, hideWeekends }, { store }) {
  const items = [];

  let idx = 0;
  let idxLocal = 0;

  while (idx < WEEKDAYS) {
    const itemDate = store.gridDateOffset(date, idx);
    const isWeekend = store.checkWeekend(itemDate);

    if (!isWeekend || !hideWeekends) {
      items.push(
        <MonthWeekDay
          key={idxLocal}
          date={itemDate}
          isCurrentDate={isWeekend}
          isWeekend={isWeekend} />
      );

      idxLocal++;
    }

    idx++;
  }

  return (
    <div className={styles.MonthWeekDays}>
      {items}
    </div>
  );
}
