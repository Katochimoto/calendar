import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import InfiniteListItem from '../InfiniteListItem';
import styles from './index.less';

export default class InfiniteList extends Component {

  transformState (props, context) {
    const {
      listRange,
      SAXISX,
      scrollX,
      scrollY,
      updated,
    } = context.infiniteStore.getState();

    return {
      listRange,
      SAXISX,
      scrollX,
      scrollY,
      updated,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const state = this.state;

    return (
      state.updated !== nextState.updated ||
      state.listRange !== nextState.listRange ||
      (state.SAXISX && state.scrollX !== nextState.scrollX) ||
      (!state.SAXISX && state.scrollY !== nextState.scrollY)
    );
  }

  componentDidMount () {
    const store = this.context.infiniteStore;
    store.addListener('change', this.handleChange, this);
    this.props.next && store.addListener('next', this.props.next);
    this.props.prev && store.addListener('prev', this.props.prev);
  }

  componentWillUnmount () {
    const store = this.context.infiniteStore;
    store.removeListener('change', this.handleChange, this);
    this.props.next && store.removeListener('next', this.props.next);
    this.props.prev && store.removeListener('prev', this.props.prev);
  }

  handleChange () {
    this.updateState();
    this.props.change && this.props.change();
  }

  getItems () {
    const store = this.context.infiniteStore;
    const { listRange, updated, SAXISX } = this.state;
    const items = [];

    let offset = -(listRange);

    while (offset <= listRange) {
      const isVisible = store.isVisibleOffset(offset);

      items.push(
        <InfiniteListItem
          key={offset}
          isVisible={isVisible}
          offset={offset}
          saxisx={SAXISX}
          updated={updated}
          getItemElement={this.props.getItemElement} />
      );

      offset++;
    }

    return items;
  }

  render () {
    const style = do {
      if (this.state.SAXISX) {
        `transform: translateX(${this.state.scrollX}px);`;
      } else {
        `transform: translateY(${this.state.scrollY}px);`;
      }
    };

    return (
      <div className={styles.InfiniteList}>
        <div className={styles.InfiniteList_Content} style={style}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteList.propTypes = {
  getItemElement: PropTypes.function,
  change: PropTypes.function,
  next: PropTypes.function,
  prev: PropTypes.function,
};
/* @endif */

InfiniteList.defaultProps = {
  getItemElement: () => null,
};
