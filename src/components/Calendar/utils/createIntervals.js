import { HOURMS } from '../constant';

export default function createIntervals (list, ms = true) {
  let intervals = [];
  let common = {};
  let work = {};
  let prev = -2;
  let start = 0;
  let j = 0;
  let i = 0;
  let len = list.length;

  for (; i < len; i++) {
    let item = list[i];
    if ((item - prev) > 1) {
      start = item;
    }
    work[start] = [ item, 0 ];
    prev = item;
  }

  for (let i in work) {
    i = i ^ 0;
    if (i !== j) {
      common[j] = [ i - 1, 1 ];
    }
    common[i] = work[i];
    j = work[i][0] + 1;
  }

  if (j <= 23) {
    common[j] = [ 23, 1 ];
  }

  if (ms) {
    for (let i in common) {
      intervals.push([ i * HOURMS, (common[i][0] + 1) * HOURMS, common[i][1] ]);
    }

  } else {
    for (let i in common) {
      intervals.push([ i ^ 0, common[i][0] + 1, common[i][1] ]);
    }
  }

  return intervals;
}
