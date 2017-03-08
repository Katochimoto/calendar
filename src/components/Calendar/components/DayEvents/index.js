/**
 *
 */

import { EventsComponent, PropTypes } from '../../utils/Component';
import DayEvent from '../DayEvent';
import arr2obj from '../../utils/arr2obj';

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
    const { intervalsOfDay, listHoursOfDay } = this.context.store.getState();
    const items = [];

    const oListHoursOfDay = arr2obj(listHoursOfDay);
    const ms = listHoursOfDay.length * datetime.HOURMS; // 100%

    const len = this.state.events.length
    let i = 0;

    for (; i < len; i++) {
      const item = this.state.events[i];

      let j = 0;
      for (const begin in intervalsOfDay) {
        const end = intervalsOfDay[ begin ];

        if (item.timeEnd < begin || item.timeBegin > end) {
          continue;
        }

        const timeBegin = Math.max(item.timeBegin, begin);
        const timeEnd = Math.min(item.timeEnd, end);
        const hourBegin = timeBegin / datetime.HOURMS ^ 0;
        const hourEnd = timeEnd / datetime.HOURMS ^ 0;
        const msBegin = timeBegin % datetime.HOURMS;
        const msEnd = timeEnd % datetime.HOURMS;

        const gridBegin = oListHoursOfDay[hourBegin] * datetime.HOURMS + msBegin;
        const gridEnd = oListHoursOfDay[hourEnd] * datetime.HOURMS + msEnd;

        const rateBegin = Math.round(1000 * 100 * gridBegin / ms) / 1000;
        const rateEnd = 100 - Math.round(1000 * 100 * gridEnd / ms) / 1000;

        items.push(
          <DayEvent
            key={`${item.id}-${j}`}
            rateBegin={rateBegin}
            rateEnd={rateEnd}
            title={item.title} />
        );
        j++;
      }
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
