/**
 *
 */

import { Component, PropTypes } from 'react';
import context from '../../context';
import Store from '../../Store';
import Datetime from '../../Datetime';
import DayEvent from '../DayEvent';

import styles from './index.less';

export default class DayEvents extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      events: []
    };

    this.updateEvents = this.updateEvents.bind(this);
    this.handleUploadEvents = this.handleUploadEvents.bind(this);

    this._timer = 0;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.state.events !== nextState.events
    );
  }

  componentDidMount () {
    this._timer = context.setTimeout(this.updateEvents, 100);
  }

  componentDidUpdate (prevProps) {
    if (this.props.date !== prevProps.date) {
      context.clearTimeout(this._timer);
      this._timer = context.setTimeout(this.updateEvents, 100);
    }
  }

  componentWillUnmount () {
    context.clearTimeout(this._timer);
    this._timer = 0;
  }

  updateEvents () {
    const { uploadEvents } = this.context.store.getState();
    uploadEvents([ this.props.date ], this.handleUploadEvents);
  }

  handleUploadEvents (events) {
    if (!this._timer) {
      return;
    }

    const datetime = this.context.datetime;
    const { hoursOfDay } = this.context.store.getState();

    const hours = hoursOfDay.split(',');
    const hoursLength = hours.length;

    events = events.map(item => {
      const dateBegin = datetime.parseDatetime(item.sDateBegin);
      const dateEnd = datetime.parseDatetime(item.sDateEnd);
      const begin = datetime.getMinutesRate(dateBegin, hoursLength);
      const end = 100 - datetime.getMinutesRate(dateEnd, hoursLength);

      return {
        dateBegin,
        dateEnd,
        begin,
        end
      };

    }).reduce((list, item) => {
      return list.concat(item);
    }, []);

    this.setState({ events });
  }

  render () {
    const items = this.state.events.map(item => (
      <DayEvent begin={item.begin} end={item.end} />
    ));

    return (
      <div className={styles.calendar_DayEvents}>
        {items}
      </div>
    );
  }
}

DayEvents.propTypes = {
  date: PropTypes.string
};

DayEvents.contextTypes = {
  store: PropTypes.instanceOf(Store),
  datetime: PropTypes.instanceOf(Datetime)
};
