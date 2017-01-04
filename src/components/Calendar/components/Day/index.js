/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import DayEvents from '../DayEvents';

import styles from '../../style';

export default class Day extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const classes = classnames({
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: this.props.weekend,
      [ this.props.className ]: Boolean(this.props.className)
    });

    return (
      <div className={ classes }>
        <DayEvents />
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.weekend выходной
 */
Day.propTypes = {
  className: PropTypes.string,
  weekend: PropTypes.bool
};

Day.defaultProps = {
  weekend: false
};
