import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
import InfiniteStore from '../../utils/InfiniteStore';
/* @endif */

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const { gridDaysItemSize, currentDate } = context.store.getState();
    const { scrollY } = props.infiniteStore.getState();
    return { scrollY, gridDaysItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  componentDidMount () {
    super.componentDidMount();

    this.props.infiniteStore.addChangeListener(this.updateState, this);

    this.props.infiniteStore.addListener('next', () => {
      const { gridDaysItemSize, currentDate } = this.state;
      const date = this.context.store.gridDateOffset(currentDate, gridDaysItemSize);
      this.context.store.update({ currentDate: date });
    }, this);

    this.props.infiniteStore.addListener('prev', () => {
      const { gridDaysItemSize, currentDate } = this.state;
      const date = this.context.store.gridDateOffset(currentDate, -(gridDaysItemSize));
      this.context.store.update({ currentDate: date });
    }, this);
  }

  componentWillUnmount () {
    super.componentWillUnmount();

    this.props.infiniteStore.removeChangeListener(this.updateState, this);

    //this.props.infiniteStore.removeListener('next');
    //this.props.infiniteStore.removeListener('prev');
  }

  componentWillUpdate (nextProps, nextState) {
    if (
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    ) {
      this.props.infiniteStore.forceUpdated();
    }
  }

  getItemElement (offset) {
    const { gridDaysItemSize, currentDate } = this.state;
    const date = this.context.store.gridDateOffset(currentDate, offset * gridDaysItemSize);

    return (
      <GridDaysItem
        date={date}
        itemSize={gridDaysItemSize}
        ItemComponent={Day} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth
    };
  }

  render () {
    const style = `transform: translateY(${this.state.scrollY}px)`;

    return (
      <div ref={node => this._contentNode = node}
        className={styles.calendar_GridDaysContent}>

        <div ref={node => this._contentScrollNode = node}
          className={styles.calendar_GridDaysContent_Scroll}
          style={style}>

          <DayHours />

          <InfiniteList
            getItemElement={this.getItemElement}
            store={this.props.infiniteStore} />
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
GridDaysContent.propTypes = {
  infiniteStore: PropTypes.instanceOf(InfiniteStore).isRequired,
};
/* @endif */

GridDaysContent.defaultProps = {};
