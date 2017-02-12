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
      <DayHeader key={3} />,
      <DayHeader key={4} />,
      <DayHeader key={5} weekend={true} />,
      <DayHeader key={6} weekend={true} />
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
        <div className={styles.calendar_GridDaysHeader_Content}>
          <InfiniteList fullFill={false} getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
