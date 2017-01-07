import raf from 'raf';

export default function rraf (callback, cnt = 1, idx = 0) {
  raf(() => {
    idx++;
    if (idx < cnt) {
      rraf(callback, cnt, idx);
    } else {
      callback();
    }
  });
}
