// @flow

import { toObject, createIntervals } from '../array';
import { offsetOnDay, offsetOnWorksDay, HOURMS } from '../date';
import defaultState from './defaultState';

export default class StoreStrategyDefault {
  state: {[id:string]: any};
  current: {[id:string]: any};
  isChanged: boolean;

  constructor () {
    const current = { ...defaultState };
    const state = Object.create(null);

    this.state = state;
    this.current = current;
    this.isChanged = false;

    /*::`*/
    Object.defineProperties(state, {
      updated: {
        enumerable: true,
        get: () => this.current.updated,
        set: (value) => {
          this.current.updated = value;
          this.isChanged = true;
        }
      },

      /**
       * [scrollHeight description]
       * @type {number}
       * @public
       */
      scrollHeight: {
        enumerable: true,
        get: () => this.current.scrollHeight,
        set: (value) => {
          const scrollHeight = this.current.scrollHeight;

          this.current.scrollHeight = value;
          this.current.scrollOffsetTop = -1 * value;
          this.current.scrollY = do {
            if (scrollHeight > 0) {
              this._limitScrollY(this.current.scrollY * value / scrollHeight);
            } else {
              0;
            }
          };

          this.isChanged = true;
        }
      },

      /**
       * [scrollWidth description]
       * @type {number}
       * @public
       */
      scrollWidth: {
        enumerable: true,
        get: () => this.current.scrollWidth,
        set: (value) => {
          const scrollWidth = this.current.scrollWidth;
          const currentDate = this.current.currentDate;

          this.current.scrollWidth = value;
          this.current.scrollOffsetLeft = -2 * this.current.listRange * value;
          this.current.scrollX = this.current.scrollX === undefined ?
            this._limitScrollX(this._getScrollXByOffset(0)) :
            scrollWidth > 0 ? this._limitScrollX(this.current.scrollX * value / scrollWidth) : 0;
          this.current.currentDate = this._getCurrentDate();
          this.current.scrollX = this._correctScrollX(currentDate);

          this.isChanged = true;
        }
      },

      /**
       * смещение скрола по оси X = -1 * listRange * scrollWidth
       * @type {number}
       * @public
       */
      scrollX: {
        enumerable: true,
        get: () => this.current.scrollX,
        set: (value) => {
          value = this._limitScrollX(value);
          if (value !== this.current.scrollX) {
            const currentDate = this.current.currentDate;

            this.current.scrollX = value;
            this.current.currentDate = this._getCurrentDate();
            this.current.scrollX = this._correctScrollX(currentDate);

            this.isChanged = true;
          }
        }
      },

      /**
       * смещение скрола по оси Y
       * @type {number}
       * @public
       */
      scrollY: {
        enumerable: true,
        get: () => this.current.scrollY,
        set: (value) => {
          value = this._limitScrollY(value);
          if (value !== this.current.scrollY) {
            this.current.scrollY = value;
            this.isChanged = true;
          }
        }
      },

      /**
       * скорость скролла по X: вправо > 0; влево < 0;
       * @type {number}
       * @public
       */
      speedScrollX: {
        enumerable: true,
        get: () => this.current.speedScrollX,
        set: (value) => {
          this.current.speedScrollX = value;
          this.isChanged = true;
        }
      },

      /**
       * скорость скролла по Y: вверх > 0; вниз < 0;
       * @type {number}
       * @public
       */
      speedScrollY: {
        enumerable: true,
        get: () => this.current.speedScrollY,
        set: (value) => {
          this.current.speedScrollY = value;
          this.isChanged = true;
        }
      },

      /**
       * Количество предзагружаемых заранее интервалов InfiniteList слева и справа от текущего
       * @constant {number}
       * @public
       * @readonly
       */
      listRange: {
        enumerable: true,
        get: () => this.current.listRange
      },

      /**
       * Рабочие часы в сутках
       * @type {string}
       * @public
       */
      hoursOfDay: {
        enumerable: true,
        get: () => this.current.hoursOfDay,
        set: (value) => {
          const list = value
            .split(',')
            .map(Number)
            .filter(item => (item >= 0 && item <= 23));

          list.sort((a, b) => (a - b));

          value = list.join(',');

          if (value !== this.current.hoursOfDay) {
            this.current.hoursOfDay = value;
            this.current.DAYMS = list.length * HOURMS;
            this.current.GRID_HOURS = toObject(list);
            this.current.INTERVALS = createIntervals(list);
            this.isChanged = true;
          }
        }
      },

      /**
       * Количество миллисекунд в сутках
       * @type {number}
       * @public
       * @readonly
       */
      DAYMS: {
        enumerable: true,
        get: () => this.current.DAYMS
      },

      /**
       * Объект соответствия рабочего часа с реальным положением в сетке
       * @constant {Object.<string, number>}
       * @public
       */
      GRID_HOURS: {
        enumerable: true,
        get: () => this.current.GRID_HOURS
      },

      /**
       * Рабочие интервалы в сутках
       * @type {Object}
       * @public
       * @readonly
       */
      INTERVALS: {
        enumerable: true,
        get: () => this.current.INTERVALS
      },

      /**
       * Количество дней в одном элементе InfiniteList.
       * Для сетки по дням.
       * @type {number}
       * @public
       */
      gridDaysItemSize: {
        enumerable: true,
        get: () => this.current.gridDaysItemSize,
        set: (value) => {
          this.current.gridDaysItemSize = value;
          this.isChanged = true;
        }
      },

      /**
       * Текущая дата
       * @type {string}
       * @public
       */
      currentDate: {
        enumerable: true,
        get: () => this.current.currentDate,
        set: (value) => {
          this.current.currentDate = value;
          this.current.scrollX = this._limitScrollX(this._getScrollXByOffset(0));
          this.isChanged = true;
        }
      },

      /**
       * Выходные дни недели
       * @type {string}
       * @public
       */
      weekends: {
        enumerable: true,
        get: () => this.current.weekends,
        set: (value) => {
          const list = value
            .split(',')
            .map(Number)
            .filter(item => (item >= 0 && item <= 6));

          list.sort((a, b) => (a - b));

          value = list.join(',');

          if (value !== this.current.weekends) {
            this.current.weekends = value;
            this.current.WEEKENDS_SET = toObject(list);
            this.isChanged = true;
          }
        }
      },

      /**
       * Объект дней недели
       * @constant {Object.<string, number>}
       * @public
       */
      WEEKENDS_SET: {
        enumerable: true,
        get: () => this.current.WEEKENDS_SET
      },

      /**
       * Начинать неделю с дня
       * @type {number}
       * @public
       */
      beginningOfWeek: {
        enumerable: true,
        get: () => this.current.beginningOfWeek,
        set: (value) => {
          this.current.beginningOfWeek = value;
          this.isChanged = true;
        }
      },

      /**
       * Скрывать выходные
       * @type {boolean}
       * @public
       */
      hideWeekends: {
        enumerable: true,
        get: () => this.current.hideWeekends,
        set: (value) => {
          value = Boolean(value);
          if (value !== this.current.hideWeekends) {
            this.current.hideWeekends = value;
            this.isChanged = true;
          }
        }
      }
    });
    /*::`;*/
  }

  update (data: {[id:string]: any}): boolean {
    this.isChanged = false;

    if (!data) {
      return this.isChanged;
    }

    for (const name in data) {
      if (
        data.hasOwnProperty(name) &&
        name in this.state &&
        data[ name ] !== this.state[ name ]
      ) {
        this.state[ name ] = data[ name ];
      }
    }

    return this.isChanged;
  }

  updateScroll (deltaX: number, deltaY: number) {
    const scrollX = this.current.scrollX + deltaX;
    const scrollY = this.current.scrollY + deltaY;

    let updX = this.update({ scrollX });
    let updY = this.update({ scrollY });

    const speedScrollX = updX ? deltaX : 0;
    const speedScrollY = updY ? deltaY : 0;

    updX = this.update({ speedScrollX }) || updX;
    updY = this.update({ speedScrollY }) || updY;

    return (updX || updY);
  }

  isVisibleOffset (offset: number): boolean {
    const { scrollX, scrollWidth, listRange, speedScrollX } = this.current;
    const min = this._getScrollXByOffset(offset);
    const max = min - scrollWidth;
    const maxOffset = scrollX / listRange;
    const minOffset = scrollX - scrollWidth * listRange;

    return scrollX !== undefined && !Boolean(
      (max > maxOffset) ||
      (max === maxOffset && speedScrollX <= 0) ||
      (min < minOffset) ||
      (min === minOffset && speedScrollX >= 0)
    );
  }

  gridDateOffset (date: number, offset: number): number {
    // day grid
    if (this.current.hideWeekends) {
      return offsetOnWorksDay(date, offset, this.current.WEEKENDS_SET);
    } else {
      return offsetOnDay(date, offset);
    }
  }

  timeToRate (time: number): number {
    const hour = time / HOURMS ^ 0;
    const ms = time % HOURMS;
    const grid = this.current.GRID_HOURS[ hour ] * HOURMS + ms;
    return Math.round(1000 * 100 * grid / this.current.DAYMS) / 1000;
  }

  _getScrollXByOffset (offset: number): number {
    return (offset + 1) * -1 * this.current.listRange * this.current.scrollWidth;
  }

  _limitScroll (value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : Math.round(value);
  }

  _limitScrollY (value: number): number {
    return this._limitScroll(value, this.current.scrollOffsetTop, this.current.scrollOffsetBottom);
  }

  _limitScrollX (value: number): number {
    return this._limitScroll(value, this.current.scrollOffsetLeft, this.current.scrollOffsetRight);
  }

  _correctScrollX (oldCurrentDate: number): number {
    if (oldCurrentDate === this.current.currentDate) {
      return this.current.scrollX;
    }

    const diff = this.current.currentDate > oldCurrentDate ? 1 : -1;
    return this._limitScrollX(this.current.scrollX + diff * this.current.scrollWidth);
  }

  _getCurrentDate (): number {
    const {
      currentDate,
      gridDaysItemSize,
      listRange,
      scrollOffsetLeft,
      scrollOffsetRight,
      scrollX
    } = this.current;

    const scrollOffsetCenter = (scrollOffsetLeft + scrollOffsetRight) / 2;
    const scrollOffsetWidth = scrollOffsetLeft > scrollOffsetRight ?
      scrollOffsetLeft - scrollOffsetRight :
      scrollOffsetRight - scrollOffsetLeft;
    const centerOffsetWidth = scrollOffsetWidth / 2;
    const sign = scrollX > scrollOffsetCenter ? 1 : -1;
    const scrollX2CenterWidth = scrollX > scrollOffsetCenter ?
      scrollX - scrollOffsetCenter :
      scrollOffsetCenter - scrollX;
    const rate = centerOffsetWidth ? sign * scrollX2CenterWidth * 100 / centerOffsetWidth : 0;
    const rateCompare = 100 / listRange;

    if (rate <= -(rateCompare)) {
      return this.gridDateOffset(currentDate, gridDaysItemSize);

    } else if (rate >= rateCompare) {
      return this.gridDateOffset(currentDate, -(gridDaysItemSize));
    }

    return currentDate;
  }
}
