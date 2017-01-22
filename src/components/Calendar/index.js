/**
 *
 */

import { PropTypes } from 'react';

import GridDays from './components/GridDays';
import Store from './Store';
import Component from './Component';

import styles from './index.less';

export default class Calendar extends Component {
  constructor (props) {
    Store.init(props);
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    Store.update(nextProps);
  }

  render () {
    return (
      <div className={styles.calendar}>
        <GridDays />
      </div>
    );
  }
}

Calendar.propTypes = {
  bindChangeEvents: PropTypes.func,
  onChangeEvents: PropTypes.func,
};

Calendar.defaultProps = {
  bindChangeEvents: function () {},
  onChangeEvents: function () {},
};
