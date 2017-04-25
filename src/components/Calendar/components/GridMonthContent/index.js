import { StoreComponent } from '../../utils/Component';
import resize from '../../utils/Component/resize';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

@resize
export default class GridMonthContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
    this.handleInfiniteNext = this.handleInfiniteNext.bind(this);
    this.handleInfinitePrev = this.handleInfinitePrev.bind(this);
  }

  transformState (props, context) {
    const {
      gridDaysItemSize,
      currentDate,
    } = context.store.getState();

    return {
      currentDate,
      gridDaysItemSize,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize
    );
  }

  handleInfiniteNext () {
    const store = this.context.store;

    store.update({
      currentDate: store.gridDateOffset(
        this.state.currentDate,
        this.state.gridDaysItemSize
      )
    });
  }

  handleInfinitePrev () {
    const store = this.context.store;

    store.update({
      currentDate: store.gridDateOffset(
        this.state.currentDate,
        -(this.state.gridDaysItemSize)
      )
    });
  }

  handleResize () {
    this.context.infiniteStore.update(this.getRect());
  }

  getItemElement (offset) {
    const { gridDaysItemSize, currentDate } = this.state;
    const date = this.context.store.gridDateOffset(currentDate, offset * gridDaysItemSize);

    return (
      <GridDaysItem
        date={date}
        itemSize={gridDaysItemSize}
        ItemComponent={Day} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.clientHeight,
      scrollWidth: 0,
    };
  }

  render () {
    return (
      <div ref={node => this._contentNode = node}
        className={styles.GridMonthContent}>

        <InfiniteList
          getItemElement={this.getItemElement}
          next={this.handleInfiniteNext}
          prev={this.handleInfinitePrev} />
      </div>
    );
  }
}
