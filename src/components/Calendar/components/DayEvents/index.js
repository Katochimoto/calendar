/**
 *
 */

import { Component, PropTypes } from 'react';
import context from '../../context';
import Store from '../../Store';
import DayEvent from '../DayEvent';

import styles from './index.less';

export default class DayEvents extends Component {
  constructor (props, context) {
    super(props, context);

    this.updateEvents = this.updateEvents.bind(this);
    this.handleUploadEvents = this.handleUploadEvents.bind(this);

    this._timer = 0;
  }

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date
    );
  }

  componentDidMount () {
    this._timer = context.setTimeout(this.updateEvents, 100);
  }

  componentDidUpdate () {
    context.clearTimeout(this._timer);
    this._timer = context.setTimeout(this.updateEvents, 100);
  }

  componentWillUnmount () {
    context.clearTimeout(this._timer);
    this._timer = 0;
  }

  updateEvents () {
    const { uploadEvents } = this.context.store.getState();
    uploadEvents([ this.props.date ], this.handleUploadEvents);
  }

  handleUploadEvents (events) {
    if (!this._timer) {
      return;
    }

    console.log('>>>', events);
  }

  render () {
    return (
      <div className={styles.calendar_DayEvents}>
        <DayEvent />
      </div>
    );
  }
}

DayEvents.propTypes = {
  date: PropTypes.string
};

DayEvents.contextTypes = {
  store: PropTypes.instanceOf(Store)
};
