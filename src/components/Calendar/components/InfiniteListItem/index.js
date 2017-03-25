import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class InfiniteListItem extends Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.itemSize !== nextProps.itemSize ||
      this.props.isVisible !== nextProps.isVisible
    );
  }

  render () {
    const { date, itemSize, isVisible, getItemElement } = this.props;
    return (
      <div className={styles.calendar_InfiniteListItem}>
        {isVisible ? getItemElement(date, itemSize) : null}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteListItem.propTypes = {
  date: PropTypes.number,
  itemSize: PropTypes.number,
  isVisible: PropTypes.boolean,
  getItemElement: PropTypes.function
};
/* @endif */

InfiniteListItem.defaultProps = {
  date: 0,
  itemSize: 0,
  isVisible: false,
  getItemElement: () => null
};
