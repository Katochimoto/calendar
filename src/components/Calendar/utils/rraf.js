import raf, { cancel as caf } from 'raf';
import context from '../context';

export {
  raf,
  caf
};

export default function rraf (callback, cnt = 1, ctx = context, idx = 0) {
  raf(function _rafCallback() {
    idx++;
    if (idx < cnt) {
      rraf(callback, cnt, ctx, idx);
    } else {
      callback.call(ctx);
    }
  });
}
