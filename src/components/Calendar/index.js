/**
 *
 */

import { Component, PropTypes } from './utils/Component';
import { onWheel, offWheel, wrapWheelCallback } from './utils/wheel';
import context from './context';
import GridDays from './components/GridDays';

import Datetime from './utils/Datetime';
import Events from './utils/Events';
import Store from './utils/Store';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      datetime: new Datetime(),
      events: new Events(),
      store: new Store()
    };

    window.store = this.state.store;

    this.handleWheel = wrapWheelCallback(this.handleWheel.bind(this));
    this.handleResize = this.handleResize.bind(this);
    this.updateStoreByWheel = this.updateStoreByWheel.bind(this);
  }

  getChildContext () {
    return {
      datetime: this.state.datetime,
      events: this.state.events,
      store: this.state.store
    };
  }

  componentWillReceiveProps (nextProps) {
    this.state.store.update(nextProps);
  }

  componentDidMount () {
    this._timerRecalculationSize = context.requestAnimationFrame(() => {
      this.state.store.update(this.getRecalculationSize());
      context.addEventListener('resize', this.handleResize, false);
      onWheel(this._calendarNode, this.handleWheel);
    });
  }

  componentWillUnmount () {
    if (this._timerRecalculationSize) {
      context.cancelAnimationFrame(this._timerRecalculationSize);
      this._timerRecalculationSize = 0;
    }

    if (this._timerUpdateStoreByWheel) {
      context.cancelAnimationFrame(this._timerUpdateStoreByWheel);
      this._timerUpdateStoreByWheel = 0;
    }

    context.removeEventListener('resize', this.handleResize, false);
    offWheel(this._calendarNode, this.handleWheel);
  }

  handleResize () {
    this.state.store.update(this.getRecalculationSize());
  }

  handleWheel (event) {
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    if (!deltaX && !deltaY) {
      return;
    }

    this._deltaX = deltaX + (this._timerUpdateStoreByWheel ? this._deltaX : 0);
    this._deltaY = deltaY + (this._timerUpdateStoreByWheel ? this._deltaY : 0);

    if (!this._timerUpdateStoreByWheel) {
      this._timerUpdateStoreByWheel = context.requestAnimationFrame(this.updateStoreByWheel);
    }
  }

  updateStoreByWheel () {
    if (this._deltaX || this._deltaY) {
      const state = this.state.store.getState();
      const newState = {};

      if (this._deltaX) {
        newState.scrollX = state.scrollX + this._deltaX;
      }

      if (this._deltaY) {
        newState.scrollY = state.scrollY + this._deltaY;
      }

      this.state.store.update(newState);
    }

    this._timerUpdateStoreByWheel = 0;
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

Calendar.childContextTypes = {
  datetime: PropTypes.instanceOf(Datetime),
  events: PropTypes.instanceOf(Events),
  store: PropTypes.instanceOf(Store)
};

Calendar.propTypes = {};

Calendar.defaultProps = {};
