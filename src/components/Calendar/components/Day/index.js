import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import DayEvents from '../DayEvents';
import styles from './index.less';

export default class Day extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.hoursOfDay !== nextProps.hoursOfDay ||
      this.props.isVisible !== nextProps.isVisible ||
      this.props.isWeekend !== nextProps.isWeekend
    );
  }

  render () {
    const {
      date,
      hoursOfDay,
      isVisible,
      isWeekend,
    } = this.props;

    const classes = classnames({
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: isWeekend
    });

    return (
      <div className={classes}>
        { isVisible ? (
          <DayEvents
            date={date}
            hoursOfDay={hoursOfDay} />
        ) : null }
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
Day.propTypes = {
  date: PropTypes.number,
  hoursOfDay: PropTypes.string,
  isVisible: PropTypes.boolean,
  isWeekend: PropTypes.boolean,
};
/* @endif */

Day.defaultProps = {
  isVisible: true,
  isWeekend: false,
};
