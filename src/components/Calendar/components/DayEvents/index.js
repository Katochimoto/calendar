import { EventsComponent } from '../../utils/Component';
import getColumn from '../../utils/getColumn';
import { HOURMS } from '../../constant';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import DayEvent from '../DayEvent';
import DayEventFolded from '../DayEventFolded';

import styles from './index.less';

export default class DayEvents extends EventsComponent {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.props.hoursOfDay !== nextProps.hoursOfDay ||
      this.state.events !== nextState.events
    );
  }

  componentDidMount () {
    super.componentDidMount();
    this.upload();
  }

  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps);
  }

  componentDidUpdate (prevProps) {
    super.componentDidUpdate();

    if (this.props.date !== prevProps.date) {
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
    const { DAYMS, GRID_HOURS, INTERVALS } = context.store.getState();
    return { events, DAYMS, GRID_HOURS, INTERVALS };
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

  getRate (time) {
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this.state.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this.state.DAYMS) / 1000;
  }

  getItems () {
    const items = [];
    const date = this.props.date;
    const INTERVALS = this.state.INTERVALS;
    const events = this.state.events;
    const eventsFolded = {};
    const eventsColumn = {};
    let columns = [];
    let columnsTimeMax = 0;

    const ilen = INTERVALS.length;
    const len = events.length;

    for (let i = 0; i < len; i++) {
      const event = events[i];
      const { id, timeEnd, timeBegin } = event;

      for (let j = 0; j < ilen; j++) {
        const interval = INTERVALS[j];
        const intervalBegin = interval[0];
        const intervalEnd = interval[1];
        const intervalFolded = interval[2];
        const intervalKey = `${date}-${intervalBegin}-${intervalEnd}`;

        if (timeEnd <= intervalBegin || timeBegin >= intervalEnd) {
          continue;
        }

        if (intervalFolded) {
          if (intervalKey in eventsFolded) {
            eventsFolded[ intervalKey ].push(event);

          } else {
            eventsFolded[ intervalKey ] = [ event ];

            items.push(
              <DayEventFolded
                key={intervalKey}
                events={eventsFolded[ intervalKey ]}
                rateBegin={this.getRate(intervalBegin - 1)} />
            );
          }

        } else {
          const rateBegin = this.getRate(Math.max(timeBegin, intervalBegin));
          const rateEnd = 100 - this.getRate(Math.min(timeEnd, intervalEnd - 1));

          if (timeBegin > columnsTimeMax) {
            columns = [];
          }

          if (timeEnd > columnsTimeMax) {
            columnsTimeMax = timeEnd;
          }

          const column = (id in eventsColumn) ?
            eventsColumn[ id ] :
            getColumn(timeBegin, columns);

          columns[ column ] = timeEnd;
          eventsColumn[ id ] = column;

          items.push(
            <DayEvent
              key={`${intervalKey}-${id}`}
              rateBegin={rateBegin}
              rateEnd={rateEnd}
              columns={columns}
              column={column}
              event={event} />
          );
        }
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

/* @if NODE_ENV=='development' **
DayEvents.propTypes = {
  date: PropTypes.number,
  hoursOfDay: PropTypes.string
};
/* @endif */
