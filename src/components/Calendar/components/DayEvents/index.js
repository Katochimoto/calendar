/**
 *
 */

import { Component } from 'react';
import DayEvent from '../DayEvent';

import styles from '../../style.less';

export default class DayEvents extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className={ styles.calendar_DayEvents }>
        <DayEvent />
      </div>
    );
  }
}
