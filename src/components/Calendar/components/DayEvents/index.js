/**
 *
 */

import { Component, PropTypes } from 'react';
import context from '../../context';
import Store from '../../Store';
import Datetime from '../../Datetime';
import DayEvent from '../DayEvent';

import styles from './index.less';

let callbacks = [];

function addListener (callback) {
  if (!callbacks.length) {
    context.setTimeout(runListeners, 100);
  }

  callbacks.push(callback);
}

function removeListener (callback) {
  let i = 0;
  while (i < callbacks.length) {
    const item = callbacks[i];

    if (item === callback) {
      callbacks.splice(i, 1);

    } else {
      i++;
    }
  }
}

function runListeners () {
  let task;
  while ((task = callbacks.shift())) {
    task();
  }
}


export default class DayEvents extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      events: []
    };

    this.updateEvents = this.updateEvents.bind(this);
    this.handleUploadEvents = this.handleUploadEvents.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.state.events !== nextState.events
    );
  }

  componentDidMount () {
    addListener(this.updateEvents);
  }

  componentDidUpdate (prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ events: [] });
      removeListener(this.updateEvents);
      addListener(this.updateEvents);
    }
  }

  componentWillUnmount () {
    removeListener(this.updateEvents);
    this._unmount = true;
  }

  updateEvents () {
    const { uploadEvents } = this.context.store.getState();
    uploadEvents([ this.props.date ], this.handleUploadEvents);
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
  store: PropTypes.instanceOf(Store),
  datetime: PropTypes.instanceOf(Datetime)
};
