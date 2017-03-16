import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.rateBegin !== nextProps.rateBegin ||
      this.props.rateEnd !== nextProps.rateEnd ||
      this.props.title !== nextProps.title ||
      this.props.column !== nextProps.column
    );
  }

  render () {
    const { title, rateBegin, rateEnd, columns, column } = this.props;
    const len = columns.length;
    const left = 100 - 100 * (len - column) / len;
    const right = 100 - (left + 100 / len)
    const fontSize = 0.9;
    const style = `font-size: ${fontSize}em; left: ${left}%; right: ${right}%; top: ${rateBegin}%; bottom: ${rateEnd}%;`;

    return (
      <div className={styles.calendar_DayEvent} style={style}>
        {title}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvent.propTypes = {
  rateBegin: PropTypes.number,
  rateEnd: PropTypes.number,
  title: PropTypes.string,
  columns: PropTypes.array,
  column: PropTypes.number
};
/* @endif */

DayEvent.defaultProps = {
  rateBegin: 0,
  rateEnd: 0,
  column: 0
};
