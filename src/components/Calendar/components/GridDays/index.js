/**
 *
 */

import { PureComponent } from 'react';

import context from '../../context';
import rraf from '../../utils/rraf';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from '../../style';

export default class GridDays extends PureComponent {
  constructor (props) {
    super(props);
    this.state = { scrollY: 0, scrollHeight: 0 };
    this.handleWheel = this.handleWheel.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount () {
    context.addEventListener('resize', this.handleResize, false);
    this.setState({ scrollHeight: getScrollHeight(this._node) });
  }

  componentWillUnmount () {
    context.removeEventListener('resize', this.handleResize, false);
    this.stophandleResize();
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

    rraf(() => {
      this.setState({ scrollY: this._scrollY }, () => {
        this._lockWheel = false;
      });
    }, 3);
  }

  handleResize () {
    this.stophandleResize();
    this._resizeTimeout = context.setTimeout(() => {
      this._resizeTimeout = 0;
      this.setState({ scrollHeight: getScrollHeight(this._node) });
    }, 50);
  }

  stophandleResize () {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = 0;
    }
  }

  render () {
    const style = {
      transform: `translate(0px, ${this.state.scrollY}px)`,
    };

    const items = [
      <Day key={0} className={styles.calendar_GridDays_day} />,
      <Day key={1} className={styles.calendar_GridDays_day} />,
      <Day key={2} className={styles.calendar_GridDays_day} />,
      <Day key={3} className={styles.calendar_GridDays_day} />,
      <Day key={4} className={styles.calendar_GridDays_day} />,
      <Day key={5} className={styles.calendar_GridDays_day} />,
      <Day key={6} className={styles.calendar_GridDays_day} />
    ];

    return (
      <div ref={node => this._node = node}
        className={styles.calendar_GridDays}
        style={style}
        onWheel={this.handleWheel}>

        <DayHours />

        <InfiniteList>
          <div className={styles.calendar_GridDays_item}>
            {items}
          </div>
        </InfiniteList>
      </div>
    );
  }
}

function getScrollHeight (node) {
  const stylesElement = context.getComputedStyle(node);
  const margin = parseFloat(stylesElement.marginTop) + parseFloat(stylesElement.marginBottom);
  return Math.ceil(node.offsetHeight / 2 + margin);
}

function getScrollY (deltaY, y, scrollHeight) {
  y = Math.max(-(scrollHeight), y + deltaY);
  y = y > 0 ? 0 : y;
  return y;
}
