import React from 'react';
import context from './decorators/context';
import stateful from './decorators/stateful';
import mutable from './decorators/mutable';

/* @if NODE_ENV=='development' **
import PropTypes from 'prop-types';
export { PropTypes };
/* @endif */

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
