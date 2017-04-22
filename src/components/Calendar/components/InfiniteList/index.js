import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import { ASCROLL } from '../../constant';
import classnames from 'classnames';
import InfiniteListItem from '../InfiniteListItem';
import styles from './index.less';

export default class InfiniteList extends Component {

  transformState (props, context) {
    const {
      listRange,
      SAXISX,
      scrollAnimation,
      scrollDirection,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
      updated,
    } = context.infiniteStore.getState();

    return {
      listRange,
      SAXISX,
      scrollAnimation,
      scrollDirection,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
      updated,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const state = this.state;

    return (
      state.updated !== nextState.updated ||
      state.listRange !== nextState.listRange ||
      state.scrollAnimation !== nextState.scrollAnimation ||
      (state.SAXISX && (
        state.scrollX !== nextState.scrollX ||
        state.speedScrollX !== nextState.speedScrollX
      )) ||
      (!state.SAXISX && (
        state.scrollY !== nextState.scrollY ||
        state.speedScrollY !== nextState.speedScrollY
      ))
    );
  }

  componentDidMount () {
    this.context.infiniteStore.addChangeListener(this.handleChange, this);
    if (this.props.checkVisible) {
      this.context.visible.initialize(this._infiniteListNode);
      this._infiniteListCheckVisible = true;
    }
  }

  componentWillUnmount () {
    this.context.infiniteStore.removeChangeListener(this.handleChange, this);
    if (this._infiniteListCheckVisible) {
      this.context.visible.destroy();
      this._infiniteListCheckVisible = false;
    }
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);

    if (this.state.scrollAnimation === ASCROLL.STOP) {
      this.context.infiniteStore.update({
        scrollAnimation: ASCROLL.OFF
      });
    }
  }

  handleChange () {
    const prevScrollDirection = this.state.scrollDirection;
    this.updateState();
    const nextScrollDirection = this.state.scrollDirection;

    if (
      this.props.next &&
      nextScrollDirection > prevScrollDirection
    ) {
      this.props.next();

    } else if (
      this.props.prev &&
      nextScrollDirection < prevScrollDirection
    ) {
      this.props.prev();
    }

    if (this.props.change) {
      this.props.change();
    }
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
    const {
      SAXISX,
      scrollAnimation,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
    } = this.state;

    const style = do {
      if (SAXISX) {
        `transform: translateX(${scrollX}px);`;
      } else {
        `transform: translateY(${scrollY}px);`;
      }
    };

    const classes = classnames({
      [ styles.InfiniteList_Content ]: true,
      [ styles.InfiniteList_Content__animation ]: scrollAnimation === ASCROLL.ON,
      [ styles.InfiniteList_Content__scrolling ]: SAXISX ?
        speedScrollX !== 0 :
        speedScrollY !== 0,
    });

    return (
      <div ref={node => this._infiniteListNode = node}
        className={styles.InfiniteList}>

        <div className={classes} style={style}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteList.propTypes = {
  change: PropTypes.function,
  checkVisible: PropTypes.boolean,
  getItemElement: PropTypes.function,
  next: PropTypes.function,
  prev: PropTypes.function,
};
/* @endif */

InfiniteList.defaultProps = {
  checkVisible: false,
  getItemElement: () => null,
};
