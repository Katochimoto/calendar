/**
 *
 */

import { Component } from '../../Component';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysContent extends Component {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ scrollY, gridDaysListItemSize, currentDate }) {
    return { scrollY, gridDaysListItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  getItemElement (listOffset, itemSize) {
    console.log(listOffset, itemSize);
    const datetime = this.context.datetime;
    const currentDate = this.state.currentDate;

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      items.push(
        <Day key={date} date={date} />
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
