import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import MonthWeekDays from '../MonthWeekDays';
import MonthWeekEvents from '../MonthWeekEvents';
import styles from './index.less';

export default class MonthWeek extends Component {
  constructor (props, context) {
    super(props, context);
    this.handleVisible = this.handleVisible.bind(this);
  }

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
      props.hideWeekends !== nextProps.hideWeekends ||
      props.weekends !== nextProps.weekends ||
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

  render () {
    const { date, hideWeekends } = this.props;
    const content = do {
      if (this.state.isVisible) {
        [
          <MonthWeekDays
            date={date}
            hideWeekends={hideWeekends} />,
          <MonthWeekEvents />
        ];
      } else {
        null;
      }
    };

    return (
      <div className={styles.MonthWeek}>
        {content}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
MonthWeek.propTypes = {
  date: PropTypes.number,
  hideWeekends: PropTypes.boolean,
  weekends: PropTypes.string,
};
/* @endif */

MonthWeek.defaultProps = {
  date: 0,
  hideWeekends: false,
  weekends: '',
};
