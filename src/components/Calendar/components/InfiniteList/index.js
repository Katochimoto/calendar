/**
 *
 */

import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import InfiniteListItem from '../InfiniteListItem';

import styles from './index.less';

export default class InfiniteList extends StoreComponent {
  transformState (props, context) {
    const { scrollX, listOffset, LIST_RANGE, scrollWidth } = context.store.getState();
    return { scrollX, listOffset, LIST_RANGE, scrollWidth };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||
      this.state.listOffset !== nextState.listOffset ||
      this.state.LIST_RANGE !== nextState.LIST_RANGE ||
      this.state.scrollX !== nextState.scrollX
    );
  }

  /**
   * FIXME подумать над оптимизацией - вызывается при каждом изменении scrollX
   */
  getItems () {
    const itemSize = this.props.itemSize;
    const { scrollX, listOffset, LIST_RANGE, scrollWidth } = this.state;

    let items = [];
    let idxLocal = -(LIST_RANGE); // local index minimizes redraw
    let idx = listOffset - LIST_RANGE;
    let end = listOffset + LIST_RANGE;

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
    const style = `transform: translateX(${this.state.scrollX}px);`;

    return (
      <div className={styles.calendar_InfiniteList}>
        <div ref={node => this._contentNode = node} className={styles.calendar_InfiniteList_Content} style={style}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteList.propTypes = {
  itemSize: PropTypes.number,
  getItemElement: PropTypes.function
};
/* @endif */

InfiniteList.defaultProps = {
  itemSize: 0,
  getItemElement: () => null
};
