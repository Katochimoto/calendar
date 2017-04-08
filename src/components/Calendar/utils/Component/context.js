import React from 'react';
import Datetime from '../Datetime';
import Events from '../Events';
import GridStore from '../GridStore';

export default function context (component) {
  component.contextTypes = {
    datetime: React.PropTypes.instanceOf(Datetime),
    events: React.PropTypes.instanceOf(Events),
    store: React.PropTypes.instanceOf(GridStore),
  };
}
