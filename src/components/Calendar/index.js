/**
 *
 */

import { PropTypes } from 'react';
import GridDays from './components/GridDays';
import Store from './Store';
import Component from './Component';

import styles from './style';

export default class Calendar extends Component {
  constructor (props) {
    Store.init(props);
    super(props);

    this.onWheel = this.onWheel.bind(this);
    this.onResize = this.onResize.bind(this);

    // this.onChangeEvents = this.onChangeEvents.bind(this);
    // props.bindChangeEvents(this.onChangeEvents);
  }

  componentDidMount () {
    super.componentDidMount();
    window.addEventListener('resize', this.onResize, false);
    this._updateCalendarSize();
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    window.removeEventListener('resize', this.onResize, false);
  }

  _transformState ({ scrollX, scrollY, scrollWidth, scrollHeight }) {
    return {
      scrollHeight,
      scrollWidth,
      scrollX,
      scrollY,
    };
  }

  // onChangeEvents () {}

  _updateCalendarSize () {
    Store.update({
      calendarWidth: this._node.offsetWidth,
      calendarHeight: this._node.offsetHeight,
    });
  }

  onResize () {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = 0;
    }

    this._resizeTimeout = setTimeout(() => {
      this._updateCalendarSize();
    }, 50);
  }

  onWheel (event) {
    event.preventDefault();
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
    // https://learn.javascript.ru/mousewheel
    // https://gist.github.com/szarsti/7122282
    // https://gist.github.com/asemler/f914c7a5fb115f0574ef

    const native = event.nativeEvent;
    const scrollX = Math.max(-(this.state.scrollWidth), this.state.scrollX + native.deltaX);
    const scrollY = Math.max(-(this.state.scrollHeight), this.state.scrollY + native.deltaY);

    Store.update({
      scrollX: scrollX > 0 ? 0 : scrollX,
      scrollY: scrollY > 0 ? 0 : scrollY,
    });
  }

  render () {
    return (
      <div ref={node => this._node = node}
        className={styles.calendar}
        onWheel={this.onWheel}>

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
