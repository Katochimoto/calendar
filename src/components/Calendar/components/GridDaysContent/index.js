/**
 *
 */

import classnames from 'classnames';

import { Component } from '../../Component';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDaysContent extends Component {
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
      <div className={styles.calendar_GridDaysContent_Item}>
        {items}
      </div>
    );
  }

  getRect () {
    return {
      scrollHeight: this._node.scrollHeight - this._node.clientHeight,
      scrollWidth: this._node.clientWidth
    };
  }

  render () {
    const style = `transform: translateY(${this.state.scrollY}px)`;
    // const style = `transform: translate3d(0, ${this.state.scrollY}px, 0)`;

    const classes = classnames({
      [ styles.calendar_GridDaysContent_Scroll ]: true,
      [ styles.calendar_GridDaysContent_Scroll__stopTransition ]: this.state.stopTransition
    });

    return (
      <div ref={node => this._node = node} className={styles.calendar_GridDaysContent}>
        <div className={classes} style={style}>
          <DayHours />
          <InfiniteList getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
