/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from '../../style';

export default class InfiniteList extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const classes = classnames({
      [ styles.calendar_InfiniteList ]: true,
      [ this.props.className ]: Boolean(this.props.className)
    });

    return (
      <div className={classes}>
        <div className={styles.calendar_InfiniteList_item}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

InfiniteList.propTypes = {
  className: PropTypes.string
};

InfiniteList.defaultProps = {
};
