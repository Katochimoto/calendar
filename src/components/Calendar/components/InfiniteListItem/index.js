import { Component, PropTypes } from '../../utils/Component';

import styles from './index.less';

export default class InfiniteListItem extends Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.idx !== nextProps.idx ||
      this.props.itemSize !== nextProps.itemSize ||
      this.props.isVisible !== nextProps.isVisible
    );
  }

  render () {
    const { idx, itemSize, isVisible, getItemElement } = this.props;
    return (
      <div className={styles.calendar_InfiniteListItem}>
        {isVisible ? getItemElement(idx, itemSize) : null}
      </div>
    );
  }
}

InfiniteListItem.propTypes = {
  idx: PropTypes.number,
  itemSize: PropTypes.number,
  isVisible: PropTypes.boolean,
  getItemElement: PropTypes.function
};

InfiniteListItem.defaultProps = {
  idx: 0,
  itemSize: 0,
  isVisible: false,
  getItemElement: () => null
};
