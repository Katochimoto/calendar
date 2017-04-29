import DayMonth from '../DayMonth';

import styles from './index.less';

export default function WeekMonth ({ date, offset, hideWeekends }, { store }) {
  const items = [];

  let idx = 0;
  let idxLocal = 0;

  while (idx < 7) {
    const itemDate = store.gridDateOffset(date, idx);
    const isWeekend = store.checkWeekend(itemDate);

    if (!isWeekend || !hideWeekends) {
      items.push(
        <DayMonth
          key={idxLocal}
          date={itemDate}
          isCurrentDate={isWeekend}
          isWeekend={isWeekend}
          offset={offset} />
      );

      idxLocal++;
    }

    idx++;
  }

  return (
    <div className={styles.WeekMonth}>
      {items}
    </div>
  );
}
