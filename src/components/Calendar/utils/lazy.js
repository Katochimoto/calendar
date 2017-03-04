import immediate from 'setimmediate2';
import context from '../context';

const callbacks = [];

export function lazy (target, key, descriptor) {
  const callback = descriptor.value;
  callback._args = [];

  const lazyRun = function () {
    const saveArgs = callback._args;
    callback._timer = 0;
    callback._args = [];
    callback.call(this, saveArgs);
  };

  descriptor.value = function (...args) {
    callback._args.push(args);

    if (!callback._timer) {
      callback._timer = immediate.setImmediate(() => {
        lazyRun.call(this);
      });
    }
  };

  return descriptor;
}

export function qlazy (callback) {
  if (!callbacks.length) {
    context.setTimeout(run, 200);
  }

  callback.cancel = () => cancel(callback);
  callbacks.push(callback);
  return callback;
}

function cancel (callback) {
  let i = 0;
  while (i < callbacks.length) {
    const item = callbacks[i];

    if (item === callback) {
      callbacks.splice(i, 1);

    } else {
      i++;
    }
  }
}

function run () {
  let task;
  while ((task = callbacks.shift())) {
    task();
  }
}
