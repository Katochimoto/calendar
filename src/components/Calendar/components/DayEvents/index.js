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
      this.state.events !== nextState.events
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

    return {
      events: context.events.getByInterval(interval)
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

  getItems () {
    const datetime = this.context.datetime;
    const { intervalsOfDay } = this.context.store.getState();
    const items = [];

    const len = this.state.events.length
    let i = 0;

    for (; i < len; i++) {
      const item = this.state.events[i];

      for (const begin in intervalsOfDay) {
        const end = intervalsOfDay[ begin ];

        if (item.timeEnd < begin || item.timeBegin > end) {
          continue;
        }

        const timeBegin = Math.max(item.timeBegin, begin);
        const timeEnd = Math.min(item.timeEnd, end);

        items.push(
          <DayEvent
            key={item.id}
            rateBegin={10}
            rateEnd={75}
            title={item.title} />
        );
      }


      /*const dateBegin = new Date(datetime.parseDate(item.dateBegin).getTime() + item.timeBegin);
      const dateEnd = new Date(datetime.parseDate(item.dateEnd).getTime() + item.timeEnd);
      const rateBegin = datetime.getMinutesRate(dateBegin, hoursLength);
      const rateEnd = 100 - datetime.getMinutesRate(dateEnd, hoursLength);

      items.push(
        <DayEvent
          key={item.id}
          rateBegin={rateBegin}
          rateEnd={rateEnd}
          title={item.title} />
      );*/
    }

    return items;
  }

  render () {
    return (
      <div className={styles.calendar_DayEvents}>
        {this.getItems()}
      </div>
    );
  }
}

DayEvents.propTypes = {
  date: PropTypes.number
};
