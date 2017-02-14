/**
 *
 */

import { raf, caf } from './utils/raf';
import { onWheel, offWheel, wrapWheelCallback } from './utils/wheel';
import { Component, PropTypes } from './Component';
import context from './context';
import GridDays from './components/GridDays';
import Store from './Store';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props) {
    Store.init(props);
    super(props);

    this.handleWheel = wrapWheelCallback(this.handleWheel.bind(this));
    this.handleResize = this.handleResize.bind(this);
    this.updateStoreByWheel = this.updateStoreByWheel.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    Store.update(nextProps);
  }

  componentDidMount () {
    super.componentDidMount();
    this._timerRecalculationSize = raf(() => {
      Store.update(this.getRecalculationSize());
      context.addEventListener('resize', this.handleResize, false);
      onWheel(this._calendarNode, this.handleWheel);
    });
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    caf(this._timerRecalculationSize);
    context.removeEventListener('resize', this.handleResize, false);
    offWheel(this._calendarNode, this.handleWheel);
  }

  handleResize () {
    Store.update(this.getRecalculationSize());
  }

  handleWheel (event) {
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    if (!deltaX && !deltaY) {
      return;
    }

    this._deltaX = deltaX + (this._lockWheel ? this._deltaX : 0);
    this._deltaY = deltaY + (this._lockWheel ? this._deltaY : 0);

    if (!this._lockWheel) {
      this._lockWheel = true;
      raf(this.updateStoreByWheel);
    }
  }

  updateStoreByWheel () {
    if (this._deltaX || this._deltaY) {
      const state = Store.getState();
      const newState = {};
      let needUpdate = false;

      if (this._deltaX) {
        const scrollX = Store.limitScrollX(state.scrollX + this._deltaX);
        if (state.scrollX !== scrollX) {
          newState.scrollX = scrollX;
          needUpdate = true;
        }
      }

      if (this._deltaY) {
        const scrollY = Store.limitScrollY(state.scrollY + this._deltaY);
        if (state.scrollY !== scrollY) {
          newState.scrollY = scrollY;
          needUpdate = true;
        }
      }

      if (needUpdate) {
        Store.update(newState);
      }
    }

    this._lockWheel = false;
  }

  getRecalculationSize () {
    const { scrollHeight, scrollWidth } = this._gridComponent.getRect();

    return {
      scrollHeight,
      scrollWidth
    };
  }

  render () {
    return (
      <div ref={calendarNode => this._calendarNode = calendarNode} className={styles.calendar}>
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
