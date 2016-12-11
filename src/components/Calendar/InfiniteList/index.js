/**
 *
 */

import { Component, PropTypes } from 'react';

export default class InfiniteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

InfiniteList.propTypes = {
  className: PropTypes.string
};

InfiniteList.defaultProps = {
};
