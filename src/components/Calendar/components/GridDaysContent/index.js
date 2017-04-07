import { StoreComponent } from '../../utils/Component';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
    this._updated = 0;
  }

  transformState (props, context) {
    const { scrollY, gridDaysItemSize, currentDate } = context.store.getState();
    return { scrollY, gridDaysItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  componentWillUpdate (nextProps, nextState) {
    if (
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    ) {
      this.context.store.update({
        updated: ++this._updated
      });
    }
  }

  getItemElement (offset) {
    const itemSize = this.state.gridDaysItemSize;
    const currentDate = this.state.currentDate;
    const date = store.gridDateOffset(currentDate, offset * itemSize);

    return (
      <GridDaysItem
        date={date}
        itemSize={itemSize}
        ItemComponent={Day} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth
    };
  }

  render () {
    const style = `transform: translateY(${this.state.scrollY}px)`;

    return (
      <div ref={node => this._contentNode = node}
        className={styles.calendar_GridDaysContent}>

        <div ref={node => this._contentScrollNode = node}
          className={styles.calendar_GridDaysContent_Scroll}
          style={style}>

          <DayHours />

          <InfiniteList getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
