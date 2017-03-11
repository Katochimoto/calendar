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
    const isFolded = this.props.folded;
    const style = do {
      if (isFolded) {
        `top: ${this.props.rateBegin}%;`;
      } else {
        `top: ${this.props.rateBegin}%; bottom: ${this.props.rateEnd}%;`;
      }
    }

    const classes = classnames({
      [ styles.calendar_DayEvent ]: true,
      [ styles.calendar_DayEvent__folded ]: isFolded
    });

    return (
      <div className={classes} style={style}>
        {isFolded ? null : this.props.title}
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
