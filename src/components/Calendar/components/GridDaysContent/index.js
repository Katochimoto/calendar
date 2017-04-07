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
  }

  transformState (props, context) {
    const { scrollY, gridDaysItemSize } = context.store.getState();
    return { scrollY, gridDaysItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize
    );
  }

  getItemElement (date, itemSize/*, offset*/) {
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

          <InfiniteList
            getItemElement={this.getItemElement}
            itemSize={this.state.gridDaysItemSize} />
        </div>
      </div>
    );
  }
}
