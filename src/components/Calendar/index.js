/**
 *
 */

import { Component, PropTypes } from 'react';
import GridDays from './components/GridDays';

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
      <div className={styles.calendar}>
        <GridDays hours={this.props.hours} hoursOfDay={this.props.hoursOfDay} />
      </div>
    );
  }
}

Calendar.propTypes = {
  grid: PropTypes.oneOf([ 'day', 'month', 'week', 'year' ]),
  currentDate: PropTypes.instanceOf(Date),
  bindChangeEvents: PropTypes.func,
  onChangeEvents: PropTypes.func,

  hours: PropTypes.object,
  hoursOfDay: PropTypes.array,
};

Calendar.defaultProps = {
  grid: 'day',
  currentDate: new Date(),
  bindChangeEvents: function () {},
  onChangeEvents: function () {},

  hours: {
    0: { title: '00:00' },
    1: { title: '01:00' },
    2: { title: '02:00' },
    3: { title: '03:00' },
    4: { title: '04:00' },
    5: { title: '05:00' },
    6: { title: '06:00' },
    7: { title: '07:00' },
    8: { title: '08:00' },
    9: { title: '09:00' },
    10: { title: '10:00' },
    11: { title: '11:00' },
    12: { title: '12:00' },
    13: { title: '13:00' },
    14: { title: '14:00' },
    15: { title: '15:00' },
    16: { title: '16:00' },
    17: { title: '17:00' },
    18: { title: '18:00' },
    19: { title: '19:00' },
    20: { title: '20:00' },
    21: { title: '21:00' },
    22: { title: '22:00' },
    23: { title: '23:00' },
  },
  hoursOfDay: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ],
};
