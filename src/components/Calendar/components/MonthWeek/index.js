import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import styles from './index.less';

export default class MonthWeek extends StoreComponent {

  componentDidMount () {
    super.componentDidMount();
    this.context.visible.observe(this._rootNode, ::this.handleVisible);
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    this.context.visible.unobserve(this._rootNode);
  }

  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const props = this.props;
    const state = this.state;

    return (
      props.date !== nextProps.date ||
      props.offset !== nextProps.offset ||
      state.isVisible !== nextState.isVisible ||
      state.hideWeekends !== nextState.hideWeekends ||
      state.weekends !== nextState.weekends
    );
  }

  transformState (props, context) {
    const {
      hideWeekends,
      weekends,
    } = context.store.getState();

    return {
      isVisible: props.offset === 0 || context.visible.check(this._rootNode),
      hideWeekends,
      weekends,
    };
  }

  handleVisible () {
    this.updateState();
  }

  render () {
    const content = do {
      if (this.state.isVisible) {
        [
          <MonthWeekDays
            date={this.props.date}
            hideWeekends={this.state.hideWeekends} />,
          <MonthWeekEvents />
        ];
      } else {
        null;
      }
    };

    return (
      <div className={styles.MonthWeek} ref={node => this._rootNode = node}>
        {content}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
MonthWeek.propTypes = {
  date: PropTypes.number,
  offset: PropTypes.number,
};
/* @endif */

MonthWeek.defaultProps = {
  date: 0,
  offset: 0,
};

function MonthWeekEvents ({ date, hideWeekends }, { datetime }) {
  return (
    <div className={styles.MonthWeekEvents}>

    </div>
  );
}

function MonthWeekDays ({ date, hideWeekends }, { datetime }) {
  const items = [];

  let idx = 0;
  let idxLocal = 0;

  while (idx < 7) {
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

function MonthWeekDay ({ date, isCurrentDate, isWeekend }, { datetime }) {
  date = datetime.parseDate(date);
  const monthDate = date.getDate();
  const weekDay = date.getDay();
  const isFirstDay = monthDate === 1;

  const classes = classnames({
    [ styles.MonthWeekDay ]: true,
    [ styles.MonthWeekDay__current ]: isCurrentDate,
    [ styles.MonthWeekDay__weekend ]: isWeekend,
    [ styles.MonthWeekDay__first ]: isFirstDay,
  });

  const monthName = do {
    if (isFirstDay) {
      'мая';
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
