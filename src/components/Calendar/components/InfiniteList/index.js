import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import InfiniteStore from '../../utils/InfiniteStore';
import InfiniteListItem from '../InfiniteListItem';

import styles from './index.less';

export default class InfiniteList extends Component {

  transformState (props) {
    const { listRange, scrollX, scrollY, updated } = props.store.getState();

    return {
      listRange,
      scrollX: props.axis === InfiniteList.AXIS_X ? scrollX : 0,
      scrollY: props.axis === InfiniteList.AXIS_Y ? scrollY : 0,
      updated,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const state = this.state;
    const props = this.props;
    const axis = props.axis;

    return (
      axis !== nextProps.axis ||
      state.updated !== nextState.updated ||
      state.listRange !== nextState.listRange ||
      (axis === InfiniteList.AXIS_X && state.scrollX !== nextState.scrollX) ||
      (axis === InfiniteList.AXIS_Y && state.scrollY !== nextState.scrollY)
    );
  }

  componentDidMount () {
    this.props.store.addChangeListener(this.updateState, this);
  }

  componentWillUnmount () {
    this.props.store.removeChangeListener(this.updateState, this);
  }

  getItems () {
    const { listRange, updated } = this.state;
    const items = [];

    let offset = -(listRange);

    while (offset <= listRange) {
      const isVisible = this.props.store.isVisibleOffset(offset);

      items.push(
        <InfiniteListItem
          key={offset}
          offset={offset}
          updated={updated}
          isVisible={isVisible}
          getItemElement={this.props.getItemElement} />
      );

      offset++;
    }

    return items;
  }

  render () {
    const axis = this.props.axis;
    const style = do {
      if (axis === InfiniteList.AXIS_X) {
        `transform: translateX(${this.state.scrollX}px);`;
      } else if (axis === InfiniteList.AXIS_Y) {
        `transform: translateY(${this.state.scrollY}px);`;
      } else {
        '';
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

InfiniteList.AXIS_X = 0;
InfiniteList.AXIS_Y = 1;

/* @if NODE_ENV=='development' **
InfiniteList.propTypes = {
  axis: PropTypes.oneOf([ InfiniteList.AXIS_X, InfiniteList.AXIS_Y ]),
  getItemElement: PropTypes.function,
  store: PropTypes.instanceOf(InfiniteStore).isRequired,
};
/* @endif */

InfiniteList.defaultProps = {
  store: new InfiniteStore(),
  axis: InfiniteList.AXIS_X,
  getItemElement: () => null,
};
