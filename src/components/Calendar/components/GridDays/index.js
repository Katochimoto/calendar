/**
 *
 */

import classnames from 'classnames';

import { Component } from '../../Component';
import context from '../../context';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDays extends Component {
  constructor (props) {
    super(props);

    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState ({ scrollY, stopTransition }) {
    return { scrollY, stopTransition };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.stopTransition !== nextState.stopTransition
    );
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
      <div className={styles.calendar_GridDays_item}>
        {items}
      </div>
    );
  }

  render () {
    const style = {
      transform: `translate(0px, ${this.state.scrollY}px)`
    };

    const classes = classnames({
      [ styles.calendar_GridDays ]: true,
      [ styles.calendar_GridDays__stopTransition ]: this.state.stopTransition
    });

    return (
      <div ref={node => this._node = node}
        className={classes}
        style={style}>

        <DayHours />
        <InfiniteList getItemElement={this.getItemElement} />
      </div>
    );
  }
}
