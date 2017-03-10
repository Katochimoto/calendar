import { Component as ComponentCommon, PropTypes } from 'react';
import context from './Component/context';
import stateful from './Component/stateful';
import mutable from './Component/mutable';

export { PropTypes };

console.log(ComponentCommon, PropTypes)

@context
@stateful
export class Component extends ComponentCommon {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('store')
export class StoreComponent extends ComponentCommon {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('events')
export class EventsComponent extends ComponentCommon {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}
