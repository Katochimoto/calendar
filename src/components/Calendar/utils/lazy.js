import context from '../context';

const callbacks = [];

export default function lazy (callback) {
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
