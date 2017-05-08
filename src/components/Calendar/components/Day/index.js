import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import DayEvents from '../DayEvents';
import styles from './index.less';

export default class Day extends Component {
  componentDidMount () {
    this.context.visible.addChangeListener(this.handleVisible, this);
  }

  componentWillUnmount () {
    this.context.visible.removeChangeListener(this.handleVisible, this);
  }

  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const props = this.props;
    const state = this.state;

    return (
      props.date !== nextProps.date ||
      props.hoursOfDay !== nextProps.hoursOfDay ||
      props.isWeekend !== nextProps.isWeekend ||
      state.isVisible !== nextState.isVisible
    );
  }

  transformState (props, context) {
    const isVisible = (
      context.visible.isVisible(props.date)
    );

    return {
      isVisible
    };
  }

  handleVisible () {
    this.updateState();
  }

  getEvents () {
    if (!this.state.isVisible) {
      return null;
    }

    const {
      date,
      hoursOfDay,
    } = this.props;

    return (
      <DayEvents
        date={date}
        hoursOfDay={hoursOfDay} />
    );
  }

  render () {
    const classes = classnames({
      [ styles.Day ]: true,
      [ styles.Day__weekend ]: this.props.isWeekend,
    });

    return (
      <div className={classes}>
        {this.getEvents()}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
Day.propTypes = {
  date: PropTypes.number,
  hoursOfDay: PropTypes.string,
  isWeekend: PropTypes.boolean,
};
/* @endif */

Day.defaultProps = {
  isWeekend: false,
};
