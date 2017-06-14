import { assert } from 'chai';
import Event, { EVENT_NEXT, EVENT_PREV } from './Event';

describe('utils/Events/Event', function () {
  beforeEach(function () {
    this.events = [];

    const date = 20170600;
    for (let i = 1; i < 31; i++) {
      this.events.push(new Event({
        id: i,
        dateBegin: date + i,
        dateEnd: date + i
      }));
    }

    this.events.forEach(function (item, idx, events) {
      item[ EVENT_PREV ] = events[idx - 1] || null;
      item[ EVENT_NEXT ] = events[idx + 1] || null;
    });
  });

  afterEach(function () {
    this.events = undefined;
  });

  describe('first', function () {
    it('должен вернуть первое событие в цепочке', function () {
      const event = this.events[5].first();
      assert.equal(event.get('dateBegin'), this.events[0].get('dateBegin'));
    });
  });

  describe('last', function () {
    it('должен вернуть последнее событие в цепочке', function () {
      const event = this.events[5].last();
      assert.equal(event.get('dateBegin'), this.events[this.events.length - 1].get('dateBegin'));
    });
  });

  describe('firstByInterval', function () {
    it('должен найти первое событие в интервале (поиск вперед)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[0].firstByInterval([dateBegin, dateEnd]);
      assert.equal(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (поиск назад)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].firstByInterval([dateBegin, dateEnd]);
      assert.equal(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (начальное событие в интервале)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[17].firstByInterval([dateBegin, dateEnd]);
      assert.equal(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (интервал начинается раньше)', function () {
      const dateBegin = 20170520;
      const dateEnd = 20170620;
      const event = this.events[17].firstByInterval([dateBegin, dateEnd]);
      assert.equal(event.get('dateBegin'), 20170601);
    });

    it('должен найти первое событие в интервале (интервал начинается раньше, поиск назад)', function () {
      const dateBegin = 20170520;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].firstByInterval([dateBegin, dateEnd]);
      assert.equal(event.get('dateBegin'), 20170601);
    });
  });
});
