/**
 *
 */

import { EventsComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import DayEvent from '../DayEvent';

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
    const { intervalsOfDay, dayms, hoursIdx } = context.store.getState();

    return { events, intervalsOfDay, dayms, hoursIdx };
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
    const HOURMS = this.context.datetime.HOURMS;
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this.state.hoursIdx[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this.state.dayms) / 1000;
  }

  getItems () {
    const date = this.props.date;
    const intervalsOfDay = this.state.intervalsOfDay;
    const items = [];
    const itemsFold = {};
    let columns = [];
    let columnsTimeMax = 0;

    let test = {};

    const len = this.state.events.length
    let i = 0;

    for (; i < len; i++) {
      const item = this.state.events[i];
      const { timeEnd, timeBegin } = item;

      let begin;
      let end;
      let beginFold = 0;
      let endFold = 0;
      let keyInterval;

      for (begin in intervalsOfDay) {
        keyInterval = `${date}-${begin}`;
        end = intervalsOfDay[ begin ];
        endFold = begin;

        if (!(timeEnd < beginFold || timeBegin > endFold)) {
          if (!(beginFold in itemsFold)) {
            itemsFold[ beginFold ] = {
              begin: beginFold,
              end: endFold,
              items: []
            };
          }

          itemsFold[ beginFold ].items.push({
            title: item.title
          });
        }

        if (!(timeEnd < begin || timeBegin > end)) {
          const rateBegin = this.getRate(Math.max(timeBegin, begin));
          const rateEnd = 100 - this.getRate(Math.min(timeEnd, end));

          if (timeBegin > columnsTimeMax) {
            columns = [];
          }

          if (timeEnd > columnsTimeMax) {
            columnsTimeMax = timeEnd;
          }

          const column = do {
            if (item.id in test) {
              test[item.id];
            } else if (columns[0] <= timeBegin) {
              0;
            } else if (columns[1] <= timeBegin) {
              1;
            } else if (columns[2] <= timeBegin) {
              2;
            } else if (columns[3] <= timeBegin) {
              3;
            } else if (columns[4] <= timeBegin) {
              4;
            } else if (columns[5] <= timeBegin) {
              5;
            } else {
              columns.length;
            }
          };

          columns[ column ] = timeEnd;
          test[item.id] = column;

          // TODO запоминать column глобально для события на день
          // необходимо в случае разрыва
          items.push(
            <DayEvent
              key={`${keyInterval}--${item.id}`}
              rateBegin={rateBegin}
              rateEnd={rateEnd}
              columns={columns}
              column={column}
              title={item.title} />
          );
        }

        beginFold = end;
      }
    }

    for (const keyFold in itemsFold) {
      const item = itemsFold[ keyFold ];
      const rateBegin = this.getRate(item.begin);
      const keyInterval = `${date}-${item.begin}`;

      items.push(
        <DayEvent
          key={keyInterval}
          folded={true}
          rateBegin={rateBegin} />
      );
    }

    return items;
  }

  render () {
    var p = performance.now();
    const items = this.getItems();
    window.test.push(performance.now() - p);
    return (
      <div className={styles.calendar_DayEvents}>{items}</div>
    );
  }
}

window.test = [];

/* @if NODE_ENV=='development' **
DayEvents.propTypes = {
  date: PropTypes.number,
  hoursOfDay: PropTypes.string
};
/* @endif */
