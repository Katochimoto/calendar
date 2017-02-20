/**
 *
 */

import classnames from 'classnames';

import { Component, PropTypes } from '../../Component';

import styles from './index.less';

export default class InfiniteList extends Component {

  transformState ({ scrollX, listOffset, listRange }) {
    return { scrollX, listOffset, listRange };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||

      this.state.listOffset !== nextState.listOffset ||
      this.state.scrollX !== nextState.scrollX ||
      this.state.listRange !== nextState.listRange
    );
  }

  getItems () {
    const itemSize = this.props.itemSize;
    let items = [];
    let idx = this.state.listOffset - this.state.listRange;
    let end = this.state.listOffset + this.state.listRange;

    const classes = classnames({
      [ styles.calendar_InfiniteList_Item ]: true,
      [ styles.calendar_InfiniteList_Item__visible ]: true
    });

    for (; idx <= end; idx++) {
      items.push(
        <div key={idx} className={classes}>
          {this.props.getItemElement(idx, itemSize)}
        </div>
      );
    }

    return items;
  }

  render () {
    const styleContent = `transform: translateX(${this.state.scrollX}px)`;

    return (
      <div className={styles.calendar_InfiniteList}>
        <div className={styles.calendar_InfiniteList_Content} style={styleContent}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

InfiniteList.propTypes = {
  itemSize: PropTypes.number,
  getItemElement: PropTypes.function
};

InfiniteList.defaultProps = {
  itemSize: 0,
  getItemElement: () => null
};
