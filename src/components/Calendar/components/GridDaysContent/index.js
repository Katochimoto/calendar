/**
 *
 */

import { Component } from '../../Component';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysContent extends Component {
  transformState ({ scrollY, gridDaysListItemSize }) {
    return { scrollY, gridDaysListItemSize };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize
    );
  }

  /**
   * @this {InfiniteList}
   */
  getItemElement (listOffset, itemSize) {
    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      items.push(
        <Day key={idx} />
      );
    }

    return (
      <div className={styles.calendar_GridDaysContent_Item}>
        {items}
      </div>
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
            itemSize={this.state.gridDaysListItemSize} />
        </div>
      </div>
    );
  }
}
