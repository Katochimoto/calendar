/**
 *
 */

import { Component } from 'react';
import Day from '../Day';
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
      <Day key={0} />,
      <Day key={1} />,
      <Day key={2} />,
      <Day key={3} />,
      <Day key={4} />,
      <Day key={5} />,
      <Day key={6} />
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
