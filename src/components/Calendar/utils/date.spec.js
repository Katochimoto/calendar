import { assert } from 'chai';
import { offsetOnWorksDay } from './date';

describe('offsetOnWorksDay', function () {
  [
    [
      [2017.033, 1],
      2017.0331
    ],
    [
      [2017.0331, 1, { 0: 0, 6: 1 }],
      2017.0403
    ],
    [
      [2017.0401, 7, { 0: 0, 6: 1 }],
      2017.0411
    ],
    [
      [2017.0406, 4, { 0: 0, 6: 1 }],
      2017.0412
    ],
    [
      [2017.0406, 4],
      2017.0410
    ],
    [
      [2017.0406, 4, { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }],
      2017.0410
    ]
  ].forEach(item => {
    it(`${JSON.stringify(item[0])} === ${item[1]}`, function () {
      assert.equal(offsetOnWorksDay.apply(null, item[0]), item[1]);
    });
  })
});
