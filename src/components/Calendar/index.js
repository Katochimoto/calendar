/**
 *
 */

import { polyfill } from 'raf';
polyfill();

import { Component, PropTypes } from './Component';
import context from './context';
import GridDays from './components/GridDays';
import Store from './Store';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props) {
    Store.init(props);
    super(props);

    this.handleWheel = this.handleWheel.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.updateStoreByWheel = this.updateStoreByWheel.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    Store.update(nextProps);
  }

  componentDidMount () {
    super.componentDidMount();
    context.addEventListener('resize', this.handleResize, false);
    this._timerRecalculationSize = context.requestAnimationFrame(() => {
      Store.update(this.getRecalculationSize());
    });
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    context.cancelAnimationFrame(this._timerRecalculationSize);
    context.removeEventListener('resize', this.handleResize, false);
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
      context.requestAnimationFrame(this.updateStoreByWheel);
    }
  }

  updateStoreByWheel () {
    if (this._deltaX || this._deltaY) {
      const state = Store.getState();
      const newState = {};
      let needUpdate = false;

      if (this._deltaX) {
        const scrollX = Store.limitScrollX(state.scrollX + this._deltaX + state.scrollDeltaX);
        if (state.scrollX !== scrollX) {
          newState.scrollX = scrollX;
          newState.scrollDeltaX = 0;
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

  handleResize () {
    Store.update(this.getRecalculationSize());
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
