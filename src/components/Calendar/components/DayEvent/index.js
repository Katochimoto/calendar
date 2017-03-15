/**
 *
 */

import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import classnames from 'classnames';

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.folded !== nextProps.folded ||
      this.props.rateBegin !== nextProps.rateBegin ||
      this.props.rateEnd !== nextProps.rateEnd ||
      this.props.title !== nextProps.title ||
      this.props.column !== nextProps.column
    );
  }

  render () {
    const { folded, title, rateBegin, rateEnd, columns, column } = this.props;
    const len = columns && columns.length;
    const width = columns ? (100 / len - 1) : 100;
    const left = columns ? (100 - 100 * (len - column) / len) : 0;
    const fontSize = 0.9;

    const style = do {
      if (folded) {
        `font-size: ${fontSize}em; width: ${width}%; left: ${left}%; top: ${rateBegin}%;`;
      } else {
        `font-size: ${fontSize}em; width: ${width}%; left: ${left}%; top: ${rateBegin}%; bottom: ${rateEnd}%;`;
      }
    }

    const classes = classnames({
      [ styles.calendar_DayEvent ]: true,
      [ styles.calendar_DayEvent__folded ]: folded
    });

    return (
      <div className={classes} style={style}>
        {folded ? null : title}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvent.propTypes = {
  folded: PropTypes.boolean,
  rateBegin: PropTypes.number,
  rateEnd: PropTypes.number,
  title: PropTypes.string,
  columns: PropTypes.array,
  column: PropTypes.number
};
/* @endif */

DayEvent.defaultProps = {
  folded: false,
  rateBegin: 0,
  rateEnd: 0,
  column: 0
};
