/**
 *
 */

import classnames from 'classnames';

import { Component, PropTypes } from '../../Component';

import styles from './index.less';

export default class InfiniteList extends Component {
  constructor (props) {
    super(props);
  }

  transformState ({ scrollX, listOffset, listRange }) {
    return { scrollX, listOffset, listRange };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.listOffset !== nextState.listOffset ||
      this.state.scrollX !== nextState.scrollX
    );
  }

  getItems () {
    let items = [];
    let begin = this.state.listOffset - this.state.listRange;
    let end = this.state.listOffset + this.state.listRange;

    const classes = classnames({
      [ styles.calendar_InfiniteList_Item ]: true,
      [ styles.calendar_InfiniteList_Item__visible ]: true
    });

    for (; begin <= end; begin++) {
      items.push(
        <div key={begin} data-key={begin} className={classes}>
          {this.props.getItemElement(begin)}
        </div>
      );
    }

    return items;
  }

  render () {
    const styleContent = `transform: translateX(${this.state.scrollX}px)`;

    return (
      <div className={styles.calendar_InfiniteList}>
        <div className={styles.calendar_InfiniteList_Content} style={styleContent}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

InfiniteList.propTypes = {
  fullFill: PropTypes.bool,
  getItemElement: PropTypes.function
};

InfiniteList.defaultProps = {
  fullFill: true,
  getItemElement: () => null
};
