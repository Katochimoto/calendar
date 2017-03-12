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
      this.props.title !== nextProps.title
    );
  }

  render () {
    const { folded, title, rateBegin, rateEnd } = this.props;
    const style = do {
      if (folded) {
        `top: ${rateBegin}%;`;
      } else {
        `top: ${rateBegin}%; bottom: ${rateEnd}%;`;
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
  title: PropTypes.string
};
/* @endif */

DayEvent.defaultProps = {
  folded: false,
  rateBegin: 0,
  rateEnd: 0
};
