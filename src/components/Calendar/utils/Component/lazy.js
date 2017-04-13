import context from '../../context';

const CALLBACKS = [];

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
    args.length && callback._args.push(args);

    if (!callback._timer) {
      const that = this;
      callback._timer = context.setImmediate(function lazyImmediate () {
        lazyRun.call(that);
      });
    }
  };

  return descriptor;
}

export function qlazy (callback) {
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
    if (CALLBACKS[i] === callback) {
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
