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
  constructor(props) {
    super(props);
    this.state = {};
  }

  hours() {
    const items = [];

    for (let i = 0; i < 24; i++) {
      items.push(<div key={i} className={ styles.calendar_Day_hour } />);
    }

    return items;
  }

  render() {
    const classes = classnames({
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: this.props.weekend,
      [ this.props.className ]: Boolean(this.props.className)
    });

    return (
      <div className={ classes }>
        <div className={ styles.calendar_Day_content }>
          {this.hours()}
        </div>
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
