/**
 *
 */

import { StoreComponent, PropTypes } from '../../utils/Component';
import InfiniteListItem from '../InfiniteListItem';

import styles from './index.less';

export default class InfiniteList extends StoreComponent {
  transformState (props, context) {
    const { scrollX, listOffset, listRange, scrollWidth } = context.store.getState();
    return { scrollX, listOffset, listRange, scrollWidth };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||
      this.state.listOffset !== nextState.listOffset ||
      this.state.listRange !== nextState.listRange ||
      this.state.scrollX !== nextState.scrollX
    );
  }

  /**
   * FIXME подумать над оптимизацией - вызывается при каждом изменении scrollX
   */
  getItems () {
    const itemSize = this.props.itemSize;
    const { scrollX, listOffset, listRange, scrollWidth } = this.state;

    let items = [];
    let idxLocal = -(listRange); // local index minimizes redraw
    let idx = listOffset - listRange;
    let end = listOffset + listRange;

    for (; idx <= end; idx++) {
      const min = this.context.store.scrollXByOffset(idxLocal);
      const max = min - scrollWidth;
      const isVisible = scrollX !== undefined && !Boolean(
        max >= scrollX ||
        min <= scrollX - scrollWidth
      );

      items.push(
        <InfiniteListItem
          idx={idx}
          itemSize={itemSize}
          isVisible={isVisible}
          getItemElement={this.props.getItemElement} />
      );

      idxLocal++;
    }

    return items;
  }

  render () {
    const style = `transform: translateX(${this.state.scrollX}px)`;

    return (
      <div className={styles.calendar_InfiniteList}>
        <div ref={node => this._contentNode = node} className={styles.calendar_InfiniteList_Content} style={style}>
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
