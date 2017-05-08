import EventEmitter from './EventEmitter';

const dispatcher = new EventEmitter();

export default class EventDispatcher {
  emitChangeSync () {
    dispatcher.emitChangeSync();
  }

  emitChange () {
    dispatcher.emitChange();
  }

  addChangeListener (callback: Function, ctx: Object): void {
    dispatcher.addChangeListener(callback, ctx);
  }

  removeChangeListener (callback: Function, ctx: Object): void {
    dispatcher.removeChangeListener(callback, ctx);
  }
}
