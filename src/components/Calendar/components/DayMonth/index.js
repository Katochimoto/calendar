import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import styles from './index.less';

export default class DayMonth extends Component {

  componentDidMount () {
    this.context.visible.observe(this._rootNode, ::this.handleVisible);
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
      props.isWeekend !== nextProps.isWeekend ||
      state.isVisible !== nextState.isVisible
    );
  }

  transformState (props, context) {
    const date = context.datetime.parseDate(props.date);
    const monthDate = date.getDate();
    const weekDay = date.getDay();

    return {
      isFirstDay: monthDate === 1,
      isVisible: props.offset === 0 || context.visible.check(this._rootNode),
      monthDate,
      weekDay,
    };
  }

  handleVisible () {
    this.updateState();
  }

  getEvents () {
    const {
      date,
    } = this.props;

    return null;
  }

  getHeader () {
    return (
      <div>
        <span className={styles.DayMonth_Date}>
          {this.state.monthDate}
        </span>
      </div>
    );
  }

  render () {
    const classes = classnames({
      [ styles.DayMonth ]: true,
      [ styles.DayMonth__current ]: this.props.isCurrentDate,
      [ styles.DayMonth__weekend ]: this.props.isWeekend,
    });

    const content = do {
      if (this.state.isVisible) {
        [
          <div className={styles.DayMonth_Header}>
            {this.getHeader()}
          </div>,
          <div className={styles.DayMonth_Content}>
            {this.getEvents()}
          </div>
        ];
      } else {
        null;
      }
    };

    return (
      <div ref={node => this._rootNode = node}
        className={classes}>
        {content}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayMonth.propTypes = {
  date: PropTypes.number,
  isCurrentDate: PropTypes.boolean,
  isWeekend: PropTypes.boolean,
  offset: PropTypes.number,
};
/* @endif */

DayMonth.defaultProps = {
  isCurrentDate: false,
  isWeekend: false,
  offset: 0,
};
