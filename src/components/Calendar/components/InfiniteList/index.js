/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from './index.less';

export default class InfiniteList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollX: 0,
      stopTransition: false
    };
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const style = {
      transform: `translate(${this.state.scrollX}px, 0px)`
    };

    const classes = classnames({
      [ styles.calendar_InfiniteList ]: true,
      [ styles.calendar_InfiniteList__stopTransition ]: this.state.stopTransition
    });

    return (
      <div className={classes} style={style}>
        <div className={styles.calendar_InfiniteList_item}>
          {this.props.getItemElement()}
        </div>
      </div>
    );
  }
}

InfiniteList.propTypes = {
  getItemElement: PropTypes.function
};

InfiniteList.defaultProps = {
  getItemElement: () => null
};
