import { Component, PropTypes } from './utils/Component';

import CalendarGrid from './components/CalendarGrid';

import Datetime from './utils/Datetime';
import Events from './utils/Events';
import CommonStore from './store/CommonStore';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props, context) {
    super(props, context);

    this._datetime = new Datetime();
    this._events = new Events();
    this._store = new CommonStore();

    // FIXME remove later
    window.store = this._store;
  }

  getChildContext () {
    return {
      datetime: this._datetime,
      events: this._events,
      store: this._store,
    };
  }

  componentWillReceiveProps (nextProps) {
    this._store.update(nextProps);
  }

  componentWillUnmount () {
    this._store.destroy();
  }

  render () {
    return (
      <div className={styles.Calendar}>
        <CalendarGrid />
      </div>
    );
  }
}

Calendar.childContextTypes = {
  datetime: PropTypes.instanceOf(Datetime),
  events: PropTypes.instanceOf(Events),
  store: PropTypes.instanceOf(CommonStore),
};

/* @if NODE_ENV=='development' **
Calendar.propTypes = {};
/* @endif */

Calendar.defaultProps = {};
