import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class InfiniteListItem extends Component {
  shouldComponentUpdate (nextProps) {
    const props = this.props;

    return (
      props.updated !== nextProps.updated ||
      props.offset !== nextProps.offset ||

      props.date !== nextProps.date ||
      props.itemSize !== nextProps.itemSize ||
      props.isVisible !== nextProps.isVisible
    );
  }

  render () {
    const {
      date,
      getItemElement,
      isVisible,
      itemSize,
      offset,
    } = this.props;

    return (
      <div className={styles.InfiniteListItem}>
        {isVisible ? getItemElement(date, itemSize, offset) : null}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteListItem.propTypes = {
  date: PropTypes.number,
  getItemElement: PropTypes.function,
  isVisible: PropTypes.boolean,
  itemSize: PropTypes.number,
  offset: PropTypes.number,
  updated: PropTypes.number,
};
/* @endif */

InfiniteListItem.defaultProps = {
  date: 0,
  getItemElement: () => null,
  isVisible: false,
  itemSize: 0,
  offset: 0,
  updated: 0,
};
