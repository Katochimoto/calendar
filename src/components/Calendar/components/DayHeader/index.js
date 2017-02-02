/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from './index.less';

export default class DayHeader extends Component {

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const classes = classnames({
      [ styles.calendar_DayHeader ]: true,
      [ styles.calendar_DayHeader__weekend ]: this.props.weekend
    });

    return (
      <div className={classes}>
        <div className={styles.calendar_DayHeader_Title}>
          ср, 22
        </div>
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.weekend выходной
 */
DayHeader.propTypes = {
  weekend: PropTypes.bool
};

DayHeader.defaultProps = {
  weekend: false
};
