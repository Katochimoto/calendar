import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import InfiniteListItem from '../InfiniteListItem';

import styles from './index.less';

export default class InfiniteList extends StoreComponent {
  transformState (props, context) {
    const { scrollX, LIST_RANGE, currentDate, gridDaysListItemSize } = context.store.getState();
    return { scrollX, LIST_RANGE, currentDate, gridDaysListItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||
      this.state.currentDate !== nextState.currentDate ||
      this.state.LIST_RANGE !== nextState.LIST_RANGE ||
      this.state.scrollX !== nextState.scrollX
    );
  }

  /**
   * FIXME подумать над оптимизацией - вызывается при каждом изменении scrollX
   */
  getItems () {
    const store = this.context.store;
    const datetime = this.context.datetime;
    const itemSize = this.props.itemSize;
    const { LIST_RANGE, currentDate, gridDaysListItemSize } = this.state;
    const items = [];

    let offset = -(LIST_RANGE);

    while (offset <= LIST_RANGE) {
      // FIXME setDate зависит от типа сетки
      // gridDaysListItemSize может изменяться при вычете выходных
      const date = datetime.offsetDay(currentDate, offset * gridDaysListItemSize);
      const isVisible = store.isVisibleOffset(offset);

      items.push(
        <InfiniteListItem
          key={offset}
          date={date}
          itemSize={itemSize}
          isVisible={isVisible}
          getItemElement={this.props.getItemElement} />
      );

      offset++;
    }

    return items;
  }

  render () {
    const style = `transform: translateX(${this.state.scrollX}px);`;

    return (
      <div className={styles.calendar_InfiniteList}>
        <div className={styles.calendar_InfiniteList_Content} style={style}>
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
