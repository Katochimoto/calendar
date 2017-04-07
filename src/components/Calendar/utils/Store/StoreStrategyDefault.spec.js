import { assert } from 'chai';
import StoreStrategyDefault from './StoreStrategyDefault';

describe('StoreStrategyDefault', function () {
  beforeEach(function () {
    this.store = new StoreStrategyDefault();
  });

  afterEach(function () {
    delete this.store;
  });

  describe('.scrollHeight', function () {
    it('установка значения', function () {
      assert.isOk(this.store.update({ scrollHeight: 1000 }));
      assert.equal(this.store.state.scrollHeight, 1000);
    });

    it('повторная установка не изменяет значения', function () {
      this.store.update({ scrollHeight: 1000 })
      assert.isNotOk(this.store.update({ scrollHeight: 1000 }));
    });

    it('пропорциональное изменение scrollY', function () {
      this.store.update({ scrollHeight: 1000, scrollY: -100 });
      this.store.update({ scrollHeight: 650 });
      assert.equal(this.store.state.scrollY, -65);
    });
  });

  describe('.scrollWidth', function () {
    it('установка значения', function () {
      assert.isOk(this.store.update({ scrollWidth: 1000 }));
      assert.equal(this.store.state.scrollWidth, 1000);
    });

    it('повторная установка не изменяет значения', function () {
      this.store.update({ scrollWidth: 1000 })
      assert.isNotOk(this.store.update({ scrollWidth: 1000 }));
    });

    it('начальное значение scrollX равно отрицательному scrollWidth, умноженному на колчество listRange', function () {
      this.store.update({ scrollWidth: 1000 });
      assert.equal(this.store.state.scrollX, -1000);
    });

    it('пропорциональное изменение scrollX', function () {
      this.store.update({ scrollWidth: 1000, scrollX: -100 });
      this.store.update({ scrollWidth: 650 });
      assert.equal(this.store.state.scrollX, -65);
    });
  });
});
