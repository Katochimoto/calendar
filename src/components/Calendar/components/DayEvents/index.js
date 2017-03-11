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
    const intervalsOfDay = this.state.intervalsOfDay;
    const items = [];
    const itemsFold = {};

    const len = this.state.events.length
    let i = 0;

    for (; i < len; i++) {
      const item = this.state.events[i];

      let begin;
      let end;
      let beginFold = 0;
      let endFold = 0;
      let partId = 0;

      for (begin in intervalsOfDay) {
        end = intervalsOfDay[ begin ];
        endFold = begin;

        if (!(item.timeEnd < beginFold || item.timeBegin > endFold)) {
          const keyFold = `${beginFold}-${endFold}`;

          if (!(keyFold in itemsFold)) {
            itemsFold[ keyFold ] = {
              begin: beginFold,
              end: endFold,
              items: []
            };
          }

          itemsFold[ keyFold ].items.push({
            key: `${item.id}-${partId}`,
            title: item.title
          });

          partId++;
        }

        if (!(item.timeEnd < begin || item.timeBegin > end)) {
          const rateBegin = this.getRate(Math.max(item.timeBegin, begin));
          const rateEnd = 100 - this.getRate(Math.min(item.timeEnd, end));

          items.push(
            <DayEvent
              key={`${item.id}-${partId}`}
              rateBegin={rateBegin}
              rateEnd={rateEnd}
              title={item.title} />
          );

          partId++;
        }

        beginFold = end;
      }
    }

    for (const keyFold in itemsFold) {
      const item = itemsFold[ keyFold ];
      const rateBegin = this.getRate(item.begin);

      items.push(
        <DayEvent
          key={keyFold}
          folded={true}
          rateBegin={rateBegin} />
      );
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
