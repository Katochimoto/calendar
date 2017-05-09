import { WEEKDAYS } from '../../utils/date';

import MonthWeekDay from '../MonthWeekDay';
import styles from './index.less';

const TRBL = {
  B: 2,
  RB: 6,
  T: 8,
  TL: 9,
};

export default function MonthWeekDays ({
  date,
  hideWeekends,
}, {
  datetime,
  store,
}) {

  const items = [];
  let trbl = 0;
  let localIdx = 0;

  for (let idx = 0; idx < WEEKDAYS; idx++) {
    const itemDate = datetime.offsetOnDay(date, idx);
    const monthDate = datetime.getDate(itemDate);
    const isWeekend = store.checkWeekend(itemDate);

    if (monthDate === 1) {
      trbl = idx === 0 ? TRBL.T : TRBL.TL;
      for (let i = 0, len = items.length - 1; i <= len; i++) {
        items[i].props.trbl = i === len ? TRBL.RB : TRBL.B;
      }
    } else if (trbl === TRBL.TL) {
      trbl = TRBL.T;
    }

    if (!isWeekend || !hideWeekends) {
      items.push(
        <MonthWeekDay
          key={localIdx}
          date={itemDate}
          isCurrentDate={isWeekend}
          isWeekend={isWeekend}
          monthDate={monthDate}
          trbl={trbl} />
      );

      localIdx++;
    }
  }

  return (
    <div className={styles.MonthWeekDays}>
      {items}
    </div>
  );
}
