/**
 *
 */

import { Component, PropTypes } from '../../Component';
import DayEvent from '../DayEvent';

import styles from './index.less';

export default class DayEvents extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  transformState ({ hoursOfDay }) {
    return { hoursOfDay };
  }

  render () {
    return (
      <div className={styles.calendar_DayEvents}>
        <DayEvent />
      </div>
    );
  }
}

DayEvents.propTypes = {
  date: PropTypes.string
};
