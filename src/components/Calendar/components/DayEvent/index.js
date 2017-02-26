/**
 *
 */

import { Component, PropTypes } from 'react';

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.begin !== nextProps.begin ||
      this.props.end !== nextProps.end
    );
  }

  /*positionEvent () { // dateBegin, duration
    const minuteOffset = 100 / (24 * 60);
    const top = Number((minuteOffset * (12 * 60 + 45)).toFixed(3));
    const height = Number((minuteOffset * (60)).toFixed(3));

    return {
      top: `${top}%`,
      height: `${height}%`,
    };
  }*/

  render () {
    const style = `top: ${this.props.begin}%; bottom: ${this.props.end}%;`;

    return (
      <div className={styles.calendar_DayEvent} style={style} />
    );
  }
}

DayEvent.propTypes = {
  begin: PropTypes.number,
  end: PropTypes.number
};
