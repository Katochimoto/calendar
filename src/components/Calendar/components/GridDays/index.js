/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from '../../style';

export default class GridDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        <Day key={0} className={styles.calendar_GridDays_day} />,
        <Day key={1} className={styles.calendar_GridDays_day} />,
        <Day key={2} className={styles.calendar_GridDays_day} />,
        <Day key={3} className={styles.calendar_GridDays_day} />,
        <Day key={4} className={styles.calendar_GridDays_day} />,
        <Day key={5} className={styles.calendar_GridDays_day} />,
        <Day key={6} className={styles.calendar_GridDays_day} />
      ]
    };
  }

  render() {
    const classes = classnames({
      [ styles.calendar_GridDays ]: true,
      [ styles.calendar_GridDays__hours ]: this.props.clockShow
    });

    return (
      <div className={classes}>
        <DayHours clockShow={this.props.clockShow} />
        <InfiniteList>
          <div className={styles.calendar_GridDays_item}>
            {this.state.items}
          </div>
        </InfiniteList>
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.clockShow показывать часы
 */
GridDays.propTypes = {
  clockShow: PropTypes.bool
};

GridDays.defaultProps = {
  clockShow: true
};
