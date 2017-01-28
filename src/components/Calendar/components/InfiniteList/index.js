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
      [ styles.calendar_InfiniteList ]: true,
      [ styles.calendar_InfiniteList__fullFill ]: this.props.fullFill
    });

    const classesContent = classnames({
      [ styles.calendar_InfiniteList_Content ]: true,
      [ styles.calendar_InfiniteList_Content__stopTransition ]: this.state.stopTransition
    });

    return (
      <div className={classes}>
        <div className={classesContent} style={style}>
          <div className={styles.calendar_InfiniteList_Item}>
            {this.props.getItemElement()}
          </div>
        </div>
      </div>
    );
  }
}

InfiniteList.propTypes = {
  fullFill: PropTypes.bool,
  getItemElement: PropTypes.function
};

InfiniteList.defaultProps = {
  fullFill: true,
  getItemElement: () => null
};
