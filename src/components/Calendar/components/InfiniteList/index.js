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
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll () {
    // console.log('>>>');
  }

  render () {
    const classes = classnames({
      [ styles.calendar_InfiniteList ]: true,
      [ this.props.className ]: Boolean(this.props.className)
    });

    return (
      <div className={classes}
        onScroll={this.onScroll}>
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
