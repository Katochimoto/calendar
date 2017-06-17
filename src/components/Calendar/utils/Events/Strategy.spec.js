import { assert } from 'chai';
import Strategy from './Strategy';
import Event, { EVENT_NEXT, EVENT_PREV } from './Event';

describe('utils/Events/Strategy', function () {
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

    this.strategy = new Strategy();
  });

  afterEach(function () {
    this.strategy.destroy();
    this.strategy = undefined;
    this.events = undefined;
  });

  describe('clearByInterval', function () {
    it('должен вернуть предыдущее событие начала интервала', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(first.get('dateBegin'), 20170614);
    });

    it('должен вернуть следующее событие конца интервала', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(last.get('dateBegin'), 20170621);
    });

    it('должен вернуть пустое начало, если интервал начинается раньше', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170501;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(first, null);
    });

    it('должен вернуть пустой конец, если интервал заканчивается позже', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170620;
      const dateEnd = 20170701;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(last, null);
    });

    it('должен вернуть последнее событие в данных, если интервал начинается позже', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170701;
      const dateEnd = 20170701;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(first, this.events[this.events.length - 1]);
    });

    it('должен вернуть первое событие в данных, если интервал заканчивается раньше', function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];

      const dateBegin = 20170501;
      const dateEnd = 20170501;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.equal(last, this.events[0]);
    });
  });
});
