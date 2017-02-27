/**
 *
 */

import { Component, PropTypes } from 'react';
import Store from '../../Store';
import Datetime from '../../Datetime';
import Events from '../../Events';
import DayEvent from '../DayEvent';

import styles from './index.less';

export default class DayEvents extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      events: []
    };

    this.handleUploadEvents = this.handleUploadEvents.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.state.events !== nextState.events
    );
  }

  componentDidMount () {
    this.updateEvents();
  }

  componentDidUpdate (prevProps) {
    if (this.props.date !== prevProps.date) {
      //this.setState({ events: [] });
      this.updateEvents();
    }
  }

  componentWillUnmount () {
    this.cancelUpdateEvents();
    this._unmount = true;
  }

  updateEvents () {
    this.cancelUpdateEvents();
    this._updateEvents = this.context.events.lazyUpload([ this.props.date ], this.handleUploadEvents);
  }

  cancelUpdateEvents () {
    if (this._updateEvents) {
      this._updateEvents.cancel();
      this._updateEvents = null;
    }
  }

  handleUploadEvents ({ interval, events }) {
    if (this._unmount || this.props.date !== interval[0]) {
      return;
    }

    const datetime = this.context.datetime;
    const { hoursOfDay } = this.context.store.getState();

    const hours = hoursOfDay.split(',');
    const hoursLength = hours.length;

    events = events.map(item => {
      const dateBegin = datetime.parseDatetime(item.dateBegin);
      const dateEnd = datetime.parseDatetime(item.dateEnd);
      const rateBegin = datetime.getMinutesRate(dateBegin, hoursLength);
      const rateEnd = 100 - datetime.getMinutesRate(dateEnd, hoursLength);

      return {
        key: item.id,
        dateBegin,
        dateEnd,
        rateBegin,
        rateEnd,
        title: item.title
      };

    }).reduce((list, item) => {
      return list.concat(item);
    }, []);

    this.setState({ events });
  }

  render () {
    const items = this.state.events.map(item => (
      <DayEvent
        key={item.key}
        title={item.title}
        rateBegin={item.rateBegin}
        rateEnd={item.rateEnd} />
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
  datetime: PropTypes.instanceOf(Datetime),
  events: PropTypes.instanceOf(Events),
  store: PropTypes.instanceOf(Store)
};
