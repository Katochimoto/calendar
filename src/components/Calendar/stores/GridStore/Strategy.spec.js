import { assert } from 'chai';
import Strategy from './Strategy';

describe('Strategy', function () {
  beforeEach(function () {
    this.strategy = new Strategy();
  });

  afterEach(function () {
    this.strategy = null;
  });

  describe('.scrollHeight', function () {
    it('установка значения', function () {
      assert.isOk(this.strategy.update({ scrollHeight: 1000 }));
      assert.equal(this.strategy.state.scrollHeight, 1000);
    });

    it('повторная установка не изменяет значения', function () {
      this.strategy.update({ scrollHeight: 1000 })
      assert.isNotOk(this.strategy.update({ scrollHeight: 1000 }));
    });

    it('пропорциональное изменение scrollY', function () {
      this.strategy.update({ scrollHeight: 1000, scrollY: -100 });
      this.strategy.update({ scrollHeight: 650 });
      assert.equal(this.strategy.state.scrollY, -65);
    });
  });

  describe('.scrollWidth', function () {
    it('установка значения', function () {
      assert.isOk(this.strategy.update({ scrollWidth: 1000 }));
      assert.equal(this.strategy.state.scrollWidth, 1000);
    });

    it('повторная установка не изменяет значения', function () {
      this.strategy.update({ scrollWidth: 1000 })
      assert.isNotOk(this.strategy.update({ scrollWidth: 1000 }));
    });

    it('начальное значение scrollX равно отрицательному scrollWidth, умноженному на колчество listRange', function () {
      this.strategy.update({ scrollWidth: 1000 });
      assert.equal(this.strategy.state.scrollX, -1000);
    });

    it('пропорциональное изменение scrollX', function () {
      this.strategy.update({ scrollWidth: 1000, scrollX: -100 });
      this.strategy.update({ scrollWidth: 650 });
      assert.equal(this.strategy.state.scrollX, -65);
    });
  });
});
