/**
 *
 */

import { Component } from 'react';
import DayEvent from '../DayEvent';

import styles from '../index.less';

export default class DayEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={ styles.calendar_day_events }>
        <DayEvent />
      </div>
    );
  }
}
