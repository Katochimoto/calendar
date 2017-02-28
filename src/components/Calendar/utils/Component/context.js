import { PropTypes } from 'react';
import Datetime from '../Datetime';
import Events from '../Events';
import Store from '../Store';

export default function context (component) {
  component.contextTypes = {
    datetime: PropTypes.instanceOf(Datetime),
    events: PropTypes.instanceOf(Events),
    store: PropTypes.instanceOf(Store)
  };
}
