import classnames from 'classnames';

import styles from './index.less';
import gridStyles from '../../style/Grid.less';

export default function MonthWeekEvent ({
  ecol,
  row,
  scol,
}) {
  const classes = classnames({
    [ styles.MonthWeekEvent ]: true,
    [ gridStyles[ `Grid_ColumnStart${scol}` ] ]: true,
    [ gridStyles[ `Grid_ColumnEnd${ecol}` ] ]: ecol > scol,
    [ gridStyles[ `Grid_RowStart${row}` ] ]: true,
  });

  return (
    <div className={classes}>
      <div className={styles.MonthWeekEvent_Content}>
        event 1
      </div>
    </div>
  );
}
