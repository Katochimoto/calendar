/**
 *
 */

import { Component, PropTypes } from '../../Component';
import classnames from 'classnames';

import styles from './index.less';

export default class DayHeader extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date
    );
  }

  render () {
    const datetime = this.context.datetime;
    const classes = classnames({
      [ styles.calendar_DayHeader ]: true
      // [ styles.calendar_DayHeader__weekend ]: this.props.weekend
    });

    return (
      <div className={classes} data-key={this.props.date}>
        <div className={styles.calendar_DayHeader_Title}>
          {datetime.gridDaysDayTitle(this.props.date)}
        </div>
      </div>
    );
  }
}

DayHeader.propTypes = {
  date: PropTypes.string
};
