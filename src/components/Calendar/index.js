/**
 *
 */

import { PropTypes } from 'react';

import context from './context';
import rraf from './utils/rraf';
import GridDays from './components/GridDays';
import Store from './Store';
import Component from './Component';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props) {
    Store.init(props);
    super(props);

    this.handleWheel = this.handleWheel.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    Store.update(nextProps);
  }

  componentDidMount () {
    super.componentDidMount();
    context.addEventListener('resize', this.handleResize, false);

    Store.update(this._gridComponent.getRect());
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    context.removeEventListener('resize', this.handleResize, false);
  }

  handleWheel (event) {
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    if (!deltaX && !deltaY) {
      return;
    }

    const { scrollX, scrollY, scrollWidth, scrollHeight } = Store.getState();
    const offset = {
      x: deltaX,
      y: deltaY,
      w: scrollWidth,
      h: scrollHeight
    };

    this._scroll = this._lockWheel ?
      getScroll(this._scroll, offset) :
      getScroll({ x: scrollX, y: scrollY }, offset);

    if (!this._lockWheel) {
      this._lockWheel = true;
      rraf(this.updateStoreByWheel, 3, this);
    }
  }

  updateStoreByWheel () {
    const { scrollX, scrollY } = Store.getState();

    if (
      scrollX !== this._scroll.x ||
      scrollY !== this._scroll.y
    ) {
      Store.update({
        scrollX: this._scroll.x,
        scrollY: this._scroll.y,
        stopTransition: false
      });
    }

    this._lockWheel = false;
  }

  handleResize () {
    const oldState = Store.getState();
    const newState = this._gridComponent.getRect();

    newState.scrollY = applyScrollYLimit(oldState.scrollY * newState.scrollHeight / oldState.scrollHeight, newState.scrollHeight);
    newState.stopTransition = true;

    Store.update(newState);
  }

  render () {
    return (
      <div className={styles.calendar} onWheel={this.handleWheel}>
        <GridDays ref={component => this._gridComponent = component} />
      </div>
    );
  }
}

Calendar.propTypes = {
  bindChangeEvents: PropTypes.func,
  onChangeEvents: PropTypes.func,
};

Calendar.defaultProps = {
  bindChangeEvents: function () {},
  onChangeEvents: function () {},
};

function getScroll (current, offset) {
  return {
    x: applyScrollXLimit(current.x + offset.x, offset.w),
    y: applyScrollYLimit(current.y + offset.y, offset.h)
  };
}

function applyScrollXLimit (value, maxValue) {
  return Math.round(Math.abs(value) > maxValue ? (value < 0 ? -1 : 1) * maxValue : value);
}

function applyScrollYLimit (value, maxValue) {
  value = Math.max(-(maxValue), value);
  value = value > 0 ? 0 : value;
  return Math.round(value);
}
