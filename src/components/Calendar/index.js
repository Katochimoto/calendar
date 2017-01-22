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
    const deltaY = event.deltaY;

    if (!deltaY) {
      return;
    }

    const { scrollY, scrollHeight } = Store.getState();

    if (this._lockWheel) {
      this._scrollY = getScrollY(deltaY, this._scrollY, scrollHeight);
      return;
    }

    this._lockWheel = true;
    this._scrollY = getScrollY(deltaY, scrollY, scrollHeight);

    rraf(this.updateStoreByWheel, 3, this);
  }

  updateStoreByWheel () {
    const { scrollY } = Store.getState();

    if (scrollY !== this._scrollY) {
      Store.update({
        scrollY: this._scrollY,
        stopTransition: false
      });
    }

    this._lockWheel = false;
  }

  handleResize () {
    const oldState = Store.getState();
    const newState = this._gridComponent.getRect();

    newState.scrollY = applyScrollYLimit(Math.round(oldState.scrollY * newState.scrollHeight / oldState.scrollHeight), newState.scrollHeight);
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

function getScrollY (deltaY, y, scrollHeight) {
  return applyScrollYLimit(y + deltaY, scrollHeight);
}

function applyScrollYLimit (y, scrollHeight) {
  y = Math.max(-(scrollHeight), y);
  y = y > 0 ? 0 : y;
  return y;
}
