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
    Store.update(getRect(this._node));
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
    const state = Store.getState();
    const { gridWidth, gridHeight, scrollHeight } = getRect(this._node);
    const scrollY = applyScrollYLimit(Math.round(state.scrollY * scrollHeight / state.scrollHeight), scrollHeight);

    Store.update({
      gridWidth,
      gridHeight,
      scrollY,
      scrollHeight,
      stopTransition: true
    });
  }

  render () {
    return (
      <div ref={node => this._node = node}
        className={styles.calendar}
        onWheel={this.handleWheel}>

        <GridDays />
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

function getRect (node) {
  const rect = node.getBoundingClientRect();
  const styles = context.getComputedStyle(node.firstChild);
  const marginHeight = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

  return {
    gridWidth: rect.width,
    gridHeight: rect.height,
    scrollHeight: rect.height + marginHeight, // Math.ceil(rect.height / 2 + marginHeight)
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
