import raf from 'raf';
import EventEmitter from './EventEmitter';
import context from '../context';

const CALLBACKS = [];

class EventsStrategy {
  getById (id) {}
  getByInterval (interval) {}
  uploadByInterval (interval) {}
}

class EventsStrategyDefault extends EventsStrategy {

}

/**
 * @param {EventsStrategy} strategy
 */
export default class Events extends EventEmitter {
  constructor (strategy) {
    super();
    this._strategy = strategy || new EventsStrategyDefault();
  }

  getList (interval) {

  }

  upload (interval, callback) {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const data = {
      interval,
      events: [
        {
          id: `${dateBegin}T07:30:00--${dateEnd}T11:30:00`,
          dateBegin: `${dateBegin}T07:30:00`,
          dateEnd: `${dateEnd}T11:30:00`,
          //color: '',
          title: `${dateBegin}`
        }
      ]
    };

    //callback(data);
    //raf(() => callback(data));
    setTimeout(callback, 500, data);
  }

  /**
   * @final
   */
  lazyUpload (interval, callback) {
    return lazy(() => this.upload(interval, callback));
  }
}

function lazy (callback) {
  if (!CALLBACKS.length) {
    context.setTimeout(run, 200);
  }

  callback.cancel = () => cancel(callback);
  CALLBACKS.push(callback);
  return callback;
}

function cancel (callback) {
  let i = 0;
  while (i < CALLBACKS.length) {
    const item = CALLBACKS[i];

    if (item === callback) {
      CALLBACKS.splice(i, 1);

    } else {
      i++;
    }
  }
}

function run () {
  let task;
  while ((task = CALLBACKS.shift())) {
    task();
  }
}
