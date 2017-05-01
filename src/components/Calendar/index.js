import { Component, PropTypes } from './utils/Component';
import context from './context';

import CalendarGrid from './components/CalendarGrid';

import Datetime from './utils/Datetime';
import Events from './utils/Events';
import GridStore from './utils/GridStore';
import InfiniteStore from './utils/InfiniteStore';
import ElementVisible from './utils/ElementVisible';
import DateVisible from './utils/components/DateVisible';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props, componentContext) {
    super(props, componentContext);

    this.state = {
      datetime: new Datetime(),
      events: new Events(),
      infiniteStore: new InfiniteStore(),
      store: new GridStore(),
      visible: new ElementVisible(),
    };

    new DateVisible(
      this.state.store,
      this.state.infiniteStore
    );

    // FIXME remove later
    window.store = this.state.store;
    window.infiniteStore = this.state.infiniteStore;
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
