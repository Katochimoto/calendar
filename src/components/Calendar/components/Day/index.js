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
      this.props.weekend !== nextProps.weekend ||
      this.props.hoursOfDay !== nextProps.hoursOfDay
    );
  }

  render () {
    const classes = classnames({
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: this.props.weekend
    });

    return (
      <div className={classes}>
        <DayEvents
          date={this.props.date}
          hoursOfDay={this.props.hoursOfDay} />
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
Day.propTypes = {
  date: PropTypes.number,
  weekend: PropTypes.boolean,
  hoursOfDay: PropTypes.string
};
/* @endif */

Day.defaultProps = {
  weekend: false
};
