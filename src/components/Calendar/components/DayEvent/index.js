/**
 *
 */

import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.rateBegin !== nextProps.rateBegin ||
      this.props.rateEnd !== nextProps.rateEnd ||
      this.props.title !== nextProps.title
    );
  }

  render () {
    const style = `top: ${this.props.rateBegin}%; bottom: ${this.props.rateEnd}%;`;

    return (
      <div className={styles.calendar_DayEvent} style={style}>
        {this.props.title}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvent.propTypes = {
  title: PropTypes.string,
  rateBegin: PropTypes.number,
  rateEnd: PropTypes.number
};
/* @endif */
