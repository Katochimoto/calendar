/**
 * Вывод:
 * - 12 часов во вьюпорте
 * - невидимые события показываются сверху или снизу вьюпорта
 * - показывать только определенный промежуток
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import DayEvents from '../DayEvents';

import styles from './index.less';

export default class Day extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.weekend !== nextProps.weekend
    );
  }

  render () {
    const classes = classnames({
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: this.props.weekend
    });

    return (
      <div className={classes}>
        <DayEvents date={this.props.date} />
      </div>
    );
  }
}

Day.propTypes = {
  date: PropTypes.string,
  weekend: PropTypes.boolean
};

Day.defaultProps = {
  weekend: false
};
