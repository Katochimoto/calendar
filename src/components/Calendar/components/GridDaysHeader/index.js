/**
 *
 */

import { StoreComponent } from '../../utils/Component';

import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysHeader extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const { gridDaysListItemSize } = context.store.getState();
    return { gridDaysListItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize
    );
  }

  getItemElement (date, itemSize) {
    return (
      <GridDaysItem
        ItemComponent={DayHeader}
        itemSize={itemSize}
        date={date} />
    );
  }

  render () {
    return (
      <div className={styles.calendar_GridDaysHeader}>
        <div className={styles.calendar_GridDaysHeader_Content}>
          <InfiniteList
            getItemElement={this.getItemElement}
            itemSize={this.state.gridDaysListItemSize} />
        </div>
      </div>
    );
  }
}
