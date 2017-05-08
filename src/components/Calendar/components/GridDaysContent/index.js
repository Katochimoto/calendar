import { StoreComponent } from '../../utils/Component';
import { resize } from '../../utils/decorators/resize';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

@resize
export default class GridDaysContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
    this.handleInfiniteNext = this.handleInfiniteNext.bind(this);
    this.handleInfinitePrev = this.handleInfinitePrev.bind(this);
    this.handleInfiniteChange = this.handleInfiniteChange.bind(this);
  }

  transformState (props, context) {
    const { gridDaysItemSize, currentDate, scaleY } = context.store.getState();
    const { scrollY } = context.infiniteStore.getState();

    return {
      currentDate,
      gridDaysItemSize,
      scaleY,
      scrollY,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.scaleY !== nextState.scaleY ||
      this.state.scrollY !== nextState.scrollY
    );
  }

  componentWillUpdate () {
    this.context.infiniteStore.forceUpdated();
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);

    if (this.state.scaleY !== prevState.scaleY) {
      this.handleResize();
    }
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

  handleInfiniteChange () {
    this.updateState();
  }

  handleResize () {
    this.context.infiniteStore.update(this.getRect());
  }

  getItemElement (offset) {
    const {
      currentDate,
      gridDaysItemSize,
    } = this.state;

    const date = this.context.store.gridDateOffset(
      currentDate,
      offset * gridDaysItemSize
    );

    return (
      <GridDaysItem
        date={date}
        ItemComponent={Day}
        itemSize={gridDaysItemSize} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth,
    };
  }

  render () {
    const style = `
      transform: translateY(${this.state.scrollY}px);
      height: ${this.state.scaleY}%;`;

    return (
      <div ref={node => this._contentNode = node}
        className={styles.GridDaysContent}>

        <div ref={node => this._contentScrollNode = node}
          className={styles.GridDaysContent_Scroll}
          style={style}>

          <DayHours />

          <InfiniteList
            getItemElement={this.getItemElement}
            next={this.handleInfiniteNext}
            prev={this.handleInfinitePrev}
            change={this.handleInfiniteChange} />
        </div>
      </div>
    );
  }
}
