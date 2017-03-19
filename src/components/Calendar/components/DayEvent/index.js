import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.top !== nextProps.top ||
      this.props.bottom !== nextProps.bottom ||
      this.props.left !== nextProps.left ||
      this.props.right !== nextProps.right
    );
  }

  render () {
    const { event, top, bottom, left, right } = this.props;
    const fontSize = 0.9;
    const style = `
      font-size: ${fontSize}em;
      left: ${left}%;
      right: ${right}%;
      top: ${top}%;
      bottom: ${bottom}%;`;

    return (
      <div className={styles.calendar_DayEvent} style={style}>
        {event.title}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvent.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
  event: PropTypes.object,
  columns: PropTypes.array,
  column: PropTypes.number
};
/* @endif */

DayEvent.defaultProps = {
  top: 0,
  bottom: 0,
  column: 0
};
