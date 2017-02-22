/**
 *
 */

import classnames from 'classnames';

import { Component, PropTypes } from '../../Component';

import styles from './index.less';

export default class InfiniteList extends Component {
  transformState ({ scrollX, listOffset, listRange, scrollWidth }) {
    return { scrollX, listOffset, listRange, scrollWidth };
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
    const scrollWidth = this.state.scrollWidth;
    const itemSize = this.props.itemSize;
    let items = [];
    let idxLocal = -(this.state.listRange);
    let idx = this.state.listOffset - this.state.listRange;
    let end = this.state.listOffset + this.state.listRange;

    for (; idx <= end; idx++) {
      const min = this.context.store.scrollXByOffset(idxLocal);
      const max = min - scrollWidth;
      const isVisible = this.state.scrollX !== undefined && !Boolean(
        max >= this.state.scrollX ||
        min <= this.state.scrollX - scrollWidth
      );

      items.push(
        <div key={idxLocal} className={styles.calendar_InfiniteList_Item}>
          {isVisible ? this.props.getItemElement(idx, itemSize) : null}
        </div>
      );

      idxLocal++;
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
