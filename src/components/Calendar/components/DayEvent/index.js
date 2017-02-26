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

  render () {
    const style = `top: ${this.props.begin}%; bottom: ${this.props.end}%;`;

    return (
      <div className={styles.calendar_DayEvent} style={style}>
        {this.props.title}
      </div>
    );
  }
}

DayEvent.propTypes = {
  title: PropTypes.string,
  begin: PropTypes.number,
  end: PropTypes.number
};
