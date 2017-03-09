/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component, PropTypes } from '../../utils/Component';
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

Day.propTypes = {
  date: PropTypes.number,
  weekend: PropTypes.boolean,
  hoursOfDay: PropTypes.string
};

Day.defaultProps = {
  weekend: false
};
