import { Component, PropTypes } from './utils/Component';

import CalendarGrid from './components/CalendarGrid';

import Datetime from './utils/Datetime';
import Events from './utils/Events';
import ElementVisible from './utils/ElementVisible';

import GridStore from './stores/GridStore';
import InfiniteStore from './stores/InfiniteStore';
import DateVisible from './stores/DateVisible';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      datetime: new Datetime(),
      events: new Events(),
      infiniteStore: new InfiniteStore(),
      store: new GridStore(),
      visible: new ElementVisible(),
    };

    this._visible = new DateVisible(
      this.state.store,
      this.state.infiniteStore
    );

    // FIXME remove later
    window.store = this.state.store;
    window.infiniteStore = this.state.infiniteStore;
    window.visibleStore = this._visible;
  }

  getChildContext () {
    const {
      datetime,
      events,
      infiniteStore,
      store,
      visible,
    } = this.state;

    return {
      datetime,
      events,
      infiniteStore,
      store,
      visible,
    };
  }

  componentWillReceiveProps (nextProps) {
    this.state.store.update(nextProps);
  }

  componentDidMount () {
    this.state.store.addChangeListener(this.handleChange, this);
  }

  componentWillUnmount () {
    this.state.store.removeChangeListener(this.handleChange, this);
  }

  handleChange () {
    this.state.infiniteStore.forceUpdated();
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
  infiniteStore: PropTypes.instanceOf(InfiniteStore),
  store: PropTypes.instanceOf(GridStore),
  visible: PropTypes.instanceOf(ElementVisible),
};

/* @if NODE_ENV=='development' **
Calendar.propTypes = {};
/* @endif */

Calendar.defaultProps = {};
