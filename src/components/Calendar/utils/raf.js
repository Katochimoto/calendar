import context from '../context';

let lastTime = 0;
let vendors = [ 'ms', 'moz', 'webkit', 'o' ];

for (let i = 0; i < 4 && !context.requestAnimationFrame; i++) {
  let vendor = vendors[ i ];
  context.requestAnimationFrame = context[ `${vendor}RequestAnimationFrame` ];
  context.cancelAnimationFrame = context[ `${vendor}CancelAnimationFrame` ] || context[ `${vendor}CancelRequestAnimationFrame` ];
}

if (!context.requestAnimationFrame) {
  context.requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = context.setTimeout(function _rafTimeout () {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
  };
}

if (!context.cancelAnimationFrame) {
  context.cancelAnimationFrame = function (id) {
    context.clearTimeout(id);
  };
}

export {
  raf: context.requestAnimationFrame,
  caf: context.cancelAnimationFrame
};
