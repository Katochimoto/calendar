/**
 *
 */

import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import classnames from 'classnames';

import styles from './index.less';

export default class DayHeader extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.isWeekend !== nextProps.isWeekend
    );
  }

  render () {
    const datetime = this.context.datetime;
    const classes = classnames({
      [ styles.calendar_DayHeader ]: true,
      [ styles.calendar_DayHeader__weekend ]: this.props.isWeekend
    });

    return (
      <div className={classes}>
        <div className={styles.calendar_DayHeader_Title}>
          {datetime.gridDaysDayTitle(this.props.date)}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayHeader.propTypes = {
  date: PropTypes.number,
  isWeekend: PropTypes.boolean
};
/* @endif */

DayHeader.defaultProps = {
  isWeekend: false
};
