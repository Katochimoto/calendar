/**
 *
 */

import { Component, PropTypes } from 'react';
import ListOfDays from './ListOfDays';

import styles from './index.less';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: props.grid
    };
  }

  render() {
    return (
      <div className={ styles.calendar }>
        <ListOfDays />
      </div>
    );
  }
}

Calendar.propTypes = {
  grid: PropTypes.oneOf([ 'day', 'month', 'week', 'year' ]),
  currentDate: PropTypes.instanceOf(Date)
};

Calendar.defaultProps = {
  grid: 'day',
  currentDate: new Date()
};
