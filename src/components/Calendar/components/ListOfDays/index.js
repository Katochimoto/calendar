/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from '../../style';

export default class ListOfDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        <Day key={0} />
      ]
    };
  }

  render() {
    const classes = classnames({
      [ styles.calendar_days ]: true,
      [ styles.calendar_days__hours ]: this.props.showСlock
    });

    return (
      <div className={classes}>
        { this.props.showСlock && <DayHours /> }
        <InfiniteList>
          {this.state.items}
        </InfiniteList>
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.showСlock показывать часы
 */
ListOfDays.propTypes = {
  showСlock: PropTypes.bool
};

ListOfDays.defaultProps = {
  showСlock: true
};
