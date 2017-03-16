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
      <div className={styles.calendar_DayEventFolded}
        style={`top: ${this.props.rateBegin}%;`} />
    );
  }
}

/* @if NODE_ENV=='development' **
DayEventFolded.propTypes = {
  rateBegin: PropTypes.number
};
/* @endif */

DayEventFolded.defaultProps = {
  rateBegin: 0
};
