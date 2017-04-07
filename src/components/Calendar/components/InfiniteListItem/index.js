import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class InfiniteListItem extends Component {
  shouldComponentUpdate (nextProps) {
    const props = this.props;
    return (
      props.isVisible !== nextProps.isVisible ||
      props.offset !== nextProps.offset ||
      props.updated !== nextProps.updated
    );
  }

  render () {
    const {
      getItemElement,
      isVisible,
      offset,
    } = this.props;

    return (
      <div className={styles.InfiniteListItem}>
        {isVisible ? getItemElement(offset) : null}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteListItem.propTypes = {
  getItemElement: PropTypes.function,
  isVisible: PropTypes.boolean,
  offset: PropTypes.number,
  updated: PropTypes.number,
};
/* @endif */

InfiniteListItem.defaultProps = {
  getItemElement: () => null,
  isVisible: false,
  offset: 0,
  updated: 0,
};
