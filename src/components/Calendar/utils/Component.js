import { Component as ReactComponent, PropTypes } from 'react';
import context from './Component/context';
import stateful from './Component/stateful';
import mutable from './Component/mutable';

export { PropTypes };

@context
@stateful
export class Component extends ReactComponent {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('store')
export class StoreComponent extends ReactComponent {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('events')
export class EventsComponent extends ReactComponent {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}
