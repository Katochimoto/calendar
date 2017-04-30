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
    this.context.visible.observe(this._rootNode, this.handleVisible);
  }

  componentWillUnmount () {
    this.context.visible.unobserve(this._rootNode);
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
      props.offset !== nextProps.offset ||
      props.weekends !== nextProps.weekends ||
      state.isVisible !== nextState.isVisible
    );
  }

  transformState (props, context) {
    const isVisible = (
      props.offset === 0 ||
      context.visible.check(this._rootNode)
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
      <div className={styles.MonthWeek} ref={node => this._rootNode = node}>
        {content}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
MonthWeek.propTypes = {
  date: PropTypes.number,
  hideWeekends: PropTypes.boolean,
  offset: PropTypes.number,
  weekends: PropTypes.string,
};
/* @endif */

MonthWeek.defaultProps = {
  date: 0,
  hideWeekends: false,
  offset: 0,
  weekends: '',
};
