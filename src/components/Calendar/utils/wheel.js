import context from '../context';

let prefix = '';
let addEventListener;
let removeEventListener

if (context.addEventListener) {
  addEventListener = 'addEventListener';
  removeEventListener = 'removeEventListener';
} else {
  addEventListener = 'attachEvent';
  removeEventListener = 'detachEvent';
  prefix = 'on';
}

const doc = context.document;
const support = do {
  if (doc) {
    if ('onwheel' in doc.createElement('div')) {
      'wheel';
    } else if (doc.onmousewheel !== undefined) {
      'mousewheel';
    } else {
      'DOMMouseScroll';
    }
  } else {
    'wheel';
  }
};

export function onWheel (element, callback, useCapture) {
  element[ addEventListener ](prefix + support, callback, useCapture);
}

export function offWheel (element, callback, useCapture) {
  element[ removeEventListener ](prefix + support, callback, useCapture);
}

export function wrapWheelCallback (callback) {
  if (support === 'wheel') {
    return callback;
  }

  return function (originalEvent) {
    if (!originalEvent) {
      originalEvent = context.event;
    }

    const event = {
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: 'wheel',
      deltaMode: 1,
      deltaX: 0,
      deltaY: 0,
      deltaZ: 0,
      clientX: originalEvent.clientX,
      clientY: originalEvent.clientY,
      preventDefault: function () {
        if (originalEvent.preventDefault) {
          originalEvent.preventDefault();

        } else {
          originalEvent.returnValue = false;
        }
      },
      stopPropagation: function () {
        if (originalEvent.stopPropagation) {
          originalEvent.stopPropagation();
        }
      },
      stopImmediatePropagation: function () {
        if (originalEvent.stopImmediatePropagation) {
          originalEvent.stopImmediatePropagation();
        }
      }
    };

    if (support === 'mousewheel') {
      event.deltaY = - 1/40 * originalEvent.wheelDelta;

      if (originalEvent.wheelDeltaX) {
        event.deltaX = - 1/40 * originalEvent.wheelDeltaX
      }

    } else {
      event.deltaY = originalEvent.detail;
    }

    return callback(event);
  };
}
