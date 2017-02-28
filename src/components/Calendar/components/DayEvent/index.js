/**
 *
 */

import { Component, PropTypes } from '../../utils/Component';

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.rateBegin !== nextProps.rateBegin ||
      this.props.rateEnd !== nextProps.rateEnd
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

DayEvent.propTypes = {
  title: PropTypes.string,
  rateBegin: PropTypes.number,
  rateEnd: PropTypes.number
};
