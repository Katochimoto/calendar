import { StoreComponent } from '../../utils/Component';
import { WEEKDAYS } from '../../utils/date';
import resize from '../../utils/Component/resize';

import InfiniteList from '../InfiniteList';
import GridMonthItem from '../GridMonthItem';

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
      currentDate,
      gridMonthItemSize,
    } = context.store.getState();

    return {
      currentDate,
      gridMonthDaysOffset: gridMonthItemSize * WEEKDAYS,
      gridMonthItemSize,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridMonthItemSize !== nextState.gridMonthItemSize
    );
  }

  handleInfiniteNext () {
    const store = this.context.store;

    store.update({
      currentDate: store.gridDateOffset(
        this.state.currentDate,
        this.state.gridMonthDaysOffset
      )
    });
  }

  handleInfinitePrev () {
    const store = this.context.store;

    store.update({
      currentDate: store.gridDateOffset(
        this.state.currentDate,
        -(this.state.gridMonthDaysOffset)
      )
    });
  }

  handleResize () {
    this.context.infiniteStore.update(this.getRect());
  }

  getItemElement (offset) {
    const {
      currentDate,
      gridMonthDaysOffset,
      gridMonthItemSize,
    } = this.state;

    const date = this.context.store.gridDateOffset(
      currentDate,
      offset * gridMonthDaysOffset
    );

    return (
      <GridMonthItem
        date={date}
        itemSize={gridMonthItemSize}
        offset={offset} />
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
          checkVisible={true}
          getItemElement={this.getItemElement}
          next={this.handleInfiniteNext}
          prev={this.handleInfinitePrev} />
      </div>
    );
  }
}
