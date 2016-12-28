/**
 *
 */

import { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';

import styles from '../../style';

export default class GridDay extends Component {
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
      [ styles.calendar_GridDay ]: true,
      [ styles.calendar_GridDay__hours ]: this.props.clockShow
    });

    return (
      <div className={classes}>
        <DayHours clockShow={this.props.clockShow} />
        <InfiniteList>
          {this.state.items}
        </InfiniteList>
      </div>
    );
  }
}

/**
 * @type {boolean} propTypes.clockShow показывать часы
 */
GridDay.propTypes = {
  clockShow: PropTypes.bool
};

GridDay.defaultProps = {
  clockShow: true
};
