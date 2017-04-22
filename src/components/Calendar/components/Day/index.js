import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import DayEvents from '../DayEvents';
import styles from './index.less';

export default class Day extends Component {

  componentDidMount () {
    this.context.visible.observe(this._dayNode, ::this.handleVisible);
  }

  componentWillUnmount () {
    this.context.visible.unobserve(this._dayNode);
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
    return {
      isVisible: props.offset === 0 || context.visible.check(this._dayNode)
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
      [ styles.calendar_Day ]: true,
      [ styles.calendar_Day__weekend ]: this.props.isWeekend,
    });

    return (
      <div className={classes} ref={node => this._dayNode = node}>
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
  offset: PropTypes.number,
};
/* @endif */

Day.defaultProps = {
  isWeekend: false,
  offset: 0,
};
