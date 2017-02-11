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

  transformState ({ scrollY, stopTransitionY }) {
    return { scrollY, stopTransitionY };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.stopTransitionY !== nextState.stopTransitionY
    );
  }

  getItemElement () {
    const items = [
      <Day key={0} />,
      <Day key={1} />,
      <Day key={2} />,
      <Day key={3} weekend={true} />,
      <Day key={4} weekend={true} />,
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
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth
    };
  }

  render () {
    const style = `transform: translateY(${this.state.scrollY}px)`;

    const classes = classnames({
      [ styles.calendar_GridDaysContent_Scroll ]: true,
      [ styles.calendar_GridDaysContent_Scroll__stopTransitionY ]: this.state.stopTransitionY
    });

    return (
      <div ref={node => this._contentNode = node} className={styles.calendar_GridDaysContent}>
        <div ref={node => this._contentScrollNode = node} className={classes} style={style}>
          <DayHours />
          <InfiniteList getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
