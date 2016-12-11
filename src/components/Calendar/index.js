/**
 *
 */

import { Component, PropTypes } from 'react';
import ListOfDays from './components/ListOfDays';

import styles from './index.less';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: props.grid
    };

    props.bindChange(this.onChange.bind(this));
  }

  onChange() {}

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
  currentDate: PropTypes.instanceOf(Date),
  bindChange: PropTypes.func
};

Calendar.defaultProps = {
  grid: 'day',
  currentDate: new Date(),
  bindChange: function () {}
};
