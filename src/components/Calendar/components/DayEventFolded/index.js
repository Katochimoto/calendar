import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEventFolded extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.rateBegin !== nextProps.rateBegin
    );
  }

  render () {
    return (
      <div
        style={`top: ${this.props.rateBegin}%;`}
        className={styles.calendar_DayEventFolded} />
    );
  }
}

/* @if NODE_ENV=='development' **
DayEventFolded.propTypes = {
  events: PropTypes.array,
  rateBegin: PropTypes.number
};
/* @endif */

DayEventFolded.defaultProps = {
  events: [],
  rateBegin: 0
};
