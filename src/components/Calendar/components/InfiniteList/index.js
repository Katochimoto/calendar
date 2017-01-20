/**
 *
 */

import { Component, PropTypes } from 'react';

import styles from './index.less';

export default class InfiniteList extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={styles.calendar_InfiniteList}>
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
