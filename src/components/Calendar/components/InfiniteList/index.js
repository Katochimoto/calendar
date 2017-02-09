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

  transformState ({ scrollX, stopTransition, listOffset, listRange }) {
    return { scrollX, stopTransition, listOffset, listRange };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.listOffset !== nextState.listOffset ||
      this.state.scrollX !== nextState.scrollX ||
      this.state.stopTransition !== nextState.stopTransition
    );
  }

  getItems () {
    let items = [];
    let begin = this.state.listOffset - this.state.listRange;
    let end = this.state.listOffset + this.state.listRange;

    const classes = classnames({
      [ styles.calendar_InfiniteList_Item ]: true,
      [ styles.calendar_InfiniteList_Item__visible ]: true
    });

    for (; begin <= end; begin++) {
      items.push(
        <div key={begin} className={classes}>
          {this.props.getItemElement(begin)}
        </div>
      );
    }

    return items;
  }

  render () {
    const styleContent = `transform: translateX(${this.state.scrollX}px)`;

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
        <div className={classesContent} style={styleContent}>
          {this.getItems()}
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
