/**
 *
 */

import { Component, PropTypes } from '../../utils/Component';
import classnames from 'classnames';

import styles from './index.less';

export default class DayHeader extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.weekend !== nextProps.weekend
    );
  }

  render () {
    const datetime = this.context.datetime;
    const classes = classnames({
      [ styles.calendar_DayHeader ]: true,
      [ styles.calendar_DayHeader__weekend ]: this.props.weekend
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

DayHeader.propTypes = {
  date: PropTypes.number,
  weekend: PropTypes.boolean
};

DayHeader.defaultProps = {
  weekend: false
};
