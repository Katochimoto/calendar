/**
 *
 */

import { Component } from 'react';
import classnames from 'classnames';

import context from '../../context';
import rraf from '../../utils/rraf';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from './index.less';

export default class GridDays extends Component {
  constructor (props) {
    super(props);
    this.state = {
      gridWidth: 0,
      gridHeight: 0,
      scrollY: 0,
      scrollHeight: 0,
      stopTransition: false
    };

    this.handleWheel = this.handleWheel.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.getItemElement = this.getItemElement.bind(this);
  }

  componentDidMount () {
    context.addEventListener('resize', this.handleResize, false);
    this.setState(getRect(this._node));
  }

  componentWillUnmount () {
    context.removeEventListener('resize', this.handleResize, false);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridHeight !== nextState.gridHeight ||
      this.state.scrollY !== nextState.scrollY ||
      this.state.scrollHeight !== nextState.scrollHeight
    );
  }

  handleWheel (event) {
    event.preventDefault();
    const deltaY = event.deltaY;

    if (!deltaY) {
      return;
    }

    if (this._lockWheel) {
      this._scrollY = getScrollY(deltaY, this._scrollY, this.state.scrollHeight);
      return;
    }

    this._lockWheel = true;
    this._scrollY = getScrollY(deltaY, this.state.scrollY, this.state.scrollHeight);

    rraf(this.wheelUpdateState, 3, this);
  }

  wheelUpdateState () {
    this.setState({
      scrollY: this._scrollY,
      stopTransition: false
    }, () => {
      this._lockWheel = false;
    });
  }

  handleResize () {
    const oldScrollHeight = this.state.scrollHeight;
    const oldScrollY = this.state.scrollY;
    const { gridWidth, gridHeight, scrollHeight } = getRect(this._node);
    const scrollY = applyScrollYLimit(Math.round(oldScrollY * scrollHeight / oldScrollHeight), scrollHeight);

    this.setState({
      gridWidth,
      gridHeight,
      scrollY,
      scrollHeight,
      stopTransition: true
    });
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
        style={style}
        onWheel={this.handleWheel}>

        <DayHours />

        <InfiniteList getItemElement={this.getItemElement} />
      </div>
    );
  }
}

function getRect (node) {
  const rect = node.getBoundingClientRect();
  const styles = context.getComputedStyle(node);
  const marginHeight = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

  return {
    gridWidth: rect.width,
    gridHeight: rect.height,
    scrollHeight: Math.ceil(rect.height / 2 + marginHeight)
  };
}

function getScrollY (deltaY, y, scrollHeight) {
  return applyScrollYLimit(y + deltaY, scrollHeight);
}

function applyScrollYLimit (y, scrollHeight) {
  y = Math.max(-(scrollHeight), y);
  y = y > 0 ? 0 : y;
  return y;
}
