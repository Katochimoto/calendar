/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from '../../index.less';

export default class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const classes = classnames({
      [ styles.calendar_infinite ]: true,
      [ this.props.className ]: Boolean(this.props.className)
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

InfiniteList.propTypes = {
  className: PropTypes.string
};

InfiniteList.defaultProps = {
};
