/**
 *
 */

import { EventsComponent, PropTypes } from '../../utils/Component';
import DayEvent from '../DayEvent';

import styles from './index.less';

export default class DayEvents extends EventsComponent {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.state.visualEvents !== nextState.visualEvents
    );
  }

  componentDidMount () {
    super.componentDidMount();
    this.upload();
  }

  componentDidUpdate (prevProps) {
    super.componentDidUpdate();

    if (this.props.date !== prevProps.date) {
      this.updateState();
      this.upload();
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    this.cancelUpload();
  }

  getInterval (props = this.props) {
    return [ props.date ];
  }

  transformState (props, context) {
    const interval = this.getInterval(props);
    const events = context.events.getByInterval(interval);
    const visualEvents = this.createVisualEvents(events, context);

    return {
      visualEvents
    };
  }

  upload () {
    this.cancelUpload();
    this._upload = this.context.events.uploadByInterval(this.getInterval());
  }

  cancelUpload () {
    if (this._upload) {
      this._upload.cancel();
      this._upload = null;
    }
  }

  createVisualEvents (events, context) {
    const datetime = context.datetime;
    const { hoursOfDay } = context.store.getState();

    const hours = hoursOfDay.split(',');
    const hoursLength = hours.length;
    const visualEvents = [];

    for (let i = 0, len = events.length; i < len; i++) {
      const item = events[i];
      const dateBegin = new Date(datetime.parseDate(item.dateBegin).getTime() + item.timeBegin);
      const dateEnd = new Date(datetime.parseDate(item.dateEnd).getTime() + item.timeEnd);
      const rateBegin = datetime.getMinutesRate(dateBegin, hoursLength);
      const rateEnd = 100 - datetime.getMinutesRate(dateEnd, hoursLength);

      visualEvents.push({
        key: item.id,
        dateBegin,
        dateEnd,
        rateBegin,
        rateEnd,
        title: item.title
      });
    }

    return visualEvents;
  }

  render () {
    const items = this.state.visualEvents.map(item => (
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
