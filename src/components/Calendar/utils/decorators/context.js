import React from 'react';
import Datetime from '../Datetime';
import Events from '../Events';
import GridStore from '../GridStore';
import InfiniteStore from '../InfiniteStore';
import ElementVisible from '../ElementVisible';

export default function context (component) {
  component.contextTypes = {
    datetime: React.PropTypes.instanceOf(Datetime),
    events: React.PropTypes.instanceOf(Events),
    infiniteStore: React.PropTypes.instanceOf(InfiniteStore),
    store: React.PropTypes.instanceOf(GridStore),
    visible: React.PropTypes.instanceOf(ElementVisible),
  };
}
