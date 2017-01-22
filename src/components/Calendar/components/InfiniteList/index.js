/**
 *
 */

import { PropTypes } from 'react';
import classnames from 'classnames';

import Component from '../../Component';

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
