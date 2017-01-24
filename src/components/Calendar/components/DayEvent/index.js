/**
 *
 */

import { Component } from 'react';

import styles from './index.less';

export default class DayEvent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate () {
    return false;
  }

  positionEvent () { // dateBegin, duration
    const minuteOffset = 100 / (24 * 60);
    const top = Number((minuteOffset * (12 * 60 + 45)).toFixed(3));
    const height = Number((minuteOffset * (60)).toFixed(3));

    return {
      top: `calc(${top}%)`,
      height: `calc(${height}%)`,
    };
  }

  render () {
    return (
      <div className={ styles.calendar_DayEvent } style={this.positionEvent()} />
    );
  }
}