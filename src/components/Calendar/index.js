/**
 *
 */

import { Component, PropTypes } from './Component';
import context from './context';
import rraf, { raf, caf } from './utils/rraf';
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
    this._timerRecalculationSize = raf(() => {
      Store.update(this.getRecalculationSize());
    });
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    caf(this._timerRecalculationSize);
    context.removeEventListener('resize', this.handleResize, false);
  }

  handleWheel (event) {
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    if (!deltaX && !deltaY) {
      return;
    }

    let scrollX;
    let scrollY;

    if (this._lockWheel) {
      scrollX = this._scrollX;
      scrollY = this._scrollY;

    } else {
      let state = Store.getState();
      scrollX = state.scrollX;
      scrollY = state.scrollY;
    }

    this._scrollX = Store.limitScrollX(scrollX + deltaX);
    this._scrollY = Store.limitScrollY(scrollY + deltaY);

    if (!this._lockWheel) {
      this._lockWheel = true;
      rraf(this.updateStoreByWheel, 3, this);
    }
  }

  updateStoreByWheel () {
    const state = Store.getState();

    if (
      state.scrollX !== this._scrollX ||
      state.scrollY !== this._scrollY
    ) {
      Store.update({
        scrollX: this._scrollX,
        scrollY: this._scrollY,
        stopTransition: false
      });
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
      scrollWidth,
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
