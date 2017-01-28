/**
 *
 */

import classnames from 'classnames';

import { Component, PropTypes } from '../../Component';

import styles from './index.less';

export default class InfiniteList extends Component {
  constructor (props) {
    super(props);
  }

  transformState ({ scrollX, stopTransition }) {
    return { scrollX, stopTransition };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollX !== nextState.scrollX ||
      this.state.stopTransition !== nextState.stopTransition
    );
  }

  render () {
    const style = {
      transform: `translate(${this.state.scrollX}px, 0px)`
    };

    const classes = classnames({
      [ styles.calendar_InfiniteList_content ]: true,
      [ styles.calendar_InfiniteList_content__stopTransition ]: this.state.stopTransition
    });

    return (
      <div className={styles.calendar_InfiniteList}>
        <div className={classes} style={style}>
          <div className={styles.calendar_InfiniteList_item}>
            {this.props.getItemElement()}
          </div>
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
