/**
 *
 */

import { Component } from '../../Component';

import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysHeader extends Component {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ gridDaysListItemSize }) {
    return { gridDaysListItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize
    );
  }

  getItemElement (listOffset, itemSize) {
    return (
      <GridDaysItem
        ItemComponent={DayHeader}
        itemSize={itemSize}
        listOffset={listOffset} />
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
