import React from 'react';
import context from './Component/context';
import stateful from './Component/stateful';
import mutable from './Component/mutable';

export const PropTypes = React.PropTypes;

@context
@stateful
export class Component extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('store')
export class StoreComponent extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('events')
export class EventsComponent extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}

@context
@stateful
@mutable('infiniteStore')
export class InfiniteStoreComponent extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.transformState(props, context);
  }
}
