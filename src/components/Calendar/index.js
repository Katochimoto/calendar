/**
 *
 */

import { Component, PropTypes } from './Component';
import context from './context';
import rraf from './utils/rraf';
import GridDays from './components/GridDays';
import Store from './Store';

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

    Store.update(this.getRecalculationSize());
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
    Store.update(this.getRecalculationSize());
  }

  getRecalculationSize () {
    const state = Store.getState();
    const { scrollHeight, scrollWidth } = this._gridComponent.getRect();
    const scrollY = state.scrollHeight > 0 ? checkLimitY(state.scrollY * scrollHeight / state.scrollHeight, scrollHeight) : 0;

    return {
      scrollHeight,
      scrollWidth,
      scrollY,
      stopTransition: true
    };
  }

  render () {
    return (
      <div className={styles.calendar}
        onWheel={this.handleWheel}>

        <GridDays ref={gridComponent => this._gridComponent = gridComponent} />
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
    x: checkLimitX(current.x + offset.x, offset.w),
    y: checkLimitY(current.y + offset.y, offset.h)
  };
}

function checkLimitX (value, maxValue) {
  return Math.round(Math.abs(value) > maxValue ? (value < 0 ? -1 : 1) * maxValue : value);
}

function checkLimitY (value, maxValue) {
  if (maxValue > 0) {
    value = Math.max(-(maxValue), value);
    return value > 0 ? 0 : Math.round(value);
  }

  return 0;
}
