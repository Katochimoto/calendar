/**
 *
 */

import { Component, PropTypes } from 'react';
import ListOfDays from './components/ListOfDays';

import styles from './style';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: props.grid
    };

    props.bindChangeEvents(this.onChangeEvents.bind(this));
  }

  onChangeEvents() {}

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
  bindChangeEvents: PropTypes.func,
  onChangeEvents: PropTypes.func
};

Calendar.defaultProps = {
  grid: 'day',
  currentDate: new Date(),
  bindChangeEvents: function () {},
  onChangeEvents: function () {}
};
