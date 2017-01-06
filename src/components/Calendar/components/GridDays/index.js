/**
 *
 */

import classnames from 'classnames';

import Store from '../../Store';
import Component from '../../Component';
import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from '../../style';

export default class GridDays extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    super.componentDidMount();
    this._updateScrollSize();
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);

    if (
      prevState.calendarWidth !== this.state.calendarWidth ||
      prevState.calendarHeight !== this.state.calendarHeight
    ) {
      this._updateScrollSize();
    }
  }

  _transformState ({ calendarWidth, calendarHeight, scrollY, hours, hoursOfDay, hideNonWorkingHours }) {
    return {
      calendarWidth,
      calendarHeight,
      hideNonWorkingHours,
      hours,
      hoursOfDay,
      scrollY,
    };
  }

  _updateScrollSize () {
    Store.update({
      scrollWidth: scrollWidth(this._node),
      scrollHeight: scrollHeight(this._node),
    });
  }

  render () {
    const style = {
      transform: `translate(0px, ${this.state.scrollY}px)`,
    };

    const classes = classnames({
      [ styles.calendar_GridDays ]: true
    });

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
        className={classes}
        style={style}>

        <DayHours hours={this.state.hours}
          hoursOfDay={this.state.hoursOfDay}
          hideNonWorkingHours={this.state.hideNonWorkingHours} />

        <InfiniteList>
          <div className={styles.calendar_GridDays_item}>
            {items}
          </div>
        </InfiniteList>
      </div>
    );
  }
}

function scrollWidth (node) {
  const stylesElement = window.getComputedStyle(node);
  const margin = parseFloat(stylesElement.marginLeft) + parseFloat(stylesElement.marginRight);
  return Math.ceil(node.offsetWidth / 2 + margin);
}

function scrollHeight (node) {
  const stylesElement = window.getComputedStyle(node);
  const margin = parseFloat(stylesElement.marginTop) + parseFloat(stylesElement.marginBottom);
  return Math.ceil(node.offsetHeight / 2 + margin);
}
