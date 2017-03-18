import { EventsComponent } from '../../utils/Component';
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
    const { INTERVALS, DAYMS, GRID_HOURS } = context.store.getState();

    return {
      DAYMS,
      events,
      GRID_HOURS,
      INTERVALS
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
        const begin = interval[0];
        const end = interval[1];
        const folded = interval[2];
        const key = `${date}-${begin}-${end}`;

        if (timeEnd <= begin || timeBegin >= end) {
          continue;
        }

        if (folded) {
          if (key in eventsFolded) {
            eventsFolded[ key ].push(event);

          } else {
            eventsFolded[ key ] = [ event ];

            items.push(
              <DayEventFolded
                key={key}
                events={eventsFolded[ key ]}
                rateBegin={this.getRate(begin - 1)} />
            );
          }

        } else {
          const rateBegin = this.getRate(Math.max(timeBegin, begin));
          const rateEnd = 100 - this.getRate(Math.min(timeEnd, end - 1));

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
              key={`${key}-${id}`}
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

function getColumn (time, columns) {
  return do {
    if (columns[0] <= time) {
      0;
    } else if (columns[1] <= time) {
      1;
    } else if (columns[2] <= time) {
      2;
    } else if (columns[3] <= time) {
      3;
    } else if (columns[4] <= time) {
      4;
    } else if (columns[5] <= time) {
      5;
    } else {
      columns.length;
    }
  };
}
