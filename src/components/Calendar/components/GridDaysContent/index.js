/**
 *
 */

import { Component } from '../../Component';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import arr2obj from '../../utils/arr2obj';

import styles from './index.less';

export default class GridDaysContent extends Component {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ scrollY, gridDaysListItemSize, currentDate, weekends, hideWeekends }) {
    return { scrollY, gridDaysListItemSize, currentDate, weekends, hideWeekends };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridDaysListItemSize !== nextState.gridDaysListItemSize ||
      this.state.hideWeekends !== nextState.hideWeekends ||
      this.state.weekends !== nextState.weekends ||
      this.state.scrollY !== nextState.scrollY
    );
  }

  getItemElement (listOffset, itemSize) {
    const datetime = this.context.datetime;
    const currentDate = this.state.currentDate;
    const weekends = this.state.weekends ? arr2obj(this.state.weekends.split(',')) : {};
    const hideWeekends = this.state.hideWeekends;

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      const isWeekend = Boolean(weekends[ datetime.getDay(date) ]);

      if (!isWeekend || !hideWeekends) {
        items.push(
          <Day key={date} date={date} weekend={isWeekend} />
        );
      }
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
