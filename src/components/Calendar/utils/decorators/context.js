import React from 'react';
import Datetime from '../Datetime';
import Events from '../Events';

import GridStore from '../../stores/GridStore';
import InfiniteStore from '../../stores/InfiniteStore';
import DateVisible from '../../stores/DateVisible';

const PropTypes = React.PropTypes;

export default function context (component) {
  component.contextTypes = {
    datetime: PropTypes.instanceOf(Datetime),
    events: PropTypes.instanceOf(Events),
    infiniteStore: PropTypes.instanceOf(InfiniteStore),
    store: PropTypes.instanceOf(GridStore),
    visible: PropTypes.instanceOf(DateVisible),
  };
}
