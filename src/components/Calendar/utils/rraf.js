import raf from 'raf';
import context from '../context';

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
