/**
 *
 */

import { Component } from 'react';
import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysHeader extends Component {
  constructor (props) {
    super(props);

    this.getItemElement = this.getItemElement.bind(this);
  }

  shouldComponentUpdate () {
    return false;
  }

  getItemElement () {
    const items = [
      <DayHeader key={0} />,
      <DayHeader key={1} />,
      <DayHeader key={2} />,
      <DayHeader key={3} weekend={true} />,
      <DayHeader key={4} weekend={true} />,
      <DayHeader key={5} />,
      <DayHeader key={6} />
    ];

    return (
      <div className={styles.calendar_GridDaysHeader_Item}>
        {items}
      </div>
    );
  }

  render () {
    return (
      <div className={styles.calendar_GridDaysHeader}>
        <InfiniteList fullFill={false} getItemElement={this.getItemElement} />
      </div>
    );
  }
}
