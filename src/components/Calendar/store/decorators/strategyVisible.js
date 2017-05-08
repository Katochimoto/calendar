import {
  offsetOnDay,
  getMonthDate,
} from '../../utils/date';

export function strategyVisible (component) {
  Object.assign(component.prototype, protoVisible);
}

export function strategyVisibleConstructor () {

}

const protoVisible = {
  /**
   * @param {number} date
   * @returns {number} процент видимости даты
   */
  checkVisibleDate (date: number): number {

  },

  isVisibleDate (date: number): boolean {
    return (
      date >= this.current.datePartBegin &&
      date <= this.current.datePartEnd
    );
  },

  _updateVisibleDate () {
    const {
      currentDate,
      gridDaysItemSize,
      gridMonthItemSize,
      hideWeekends,
      weekends,
    } = this.current;

    const itemSize = gridDaysItemSize;
    const daysInItem = 1;

    const range = this.getVisibleRange();
    const startItem = range[0];
    const startRate = range[1];
    const endItem = range[2];
    const endRate = range[3];
    const itemRate = 100 / itemSize;
    const gridItemSize = itemSize * daysInItem;

    const startFullVisibleItem = startRate / itemRate | 0;
    const startRateRest = startRate === 100 ? 0 : startRate % itemRate;
    const startPartVisibleItem = startFullVisibleItem + (startRateRest ? 1 : 0);

    const endFullVisibleItem = endRate / itemRate | 0;
    const endRateRest = endRate === 100 ? 0 : endRate % itemRate;
    const endPartVisibleItem = endFullVisibleItem + (endRateRest ? 1 : 0);

    const daysFullBegin = gridItemSize + (startItem * gridItemSize) - startFullVisibleItem * daysInItem;
    const daysFullEnd = endItem * gridItemSize + endFullVisibleItem * daysInItem - 1;
    const daysPartBegin = gridItemSize + (startItem * gridItemSize) - startPartVisibleItem * daysInItem;
    const daysPartEnd = endItem * gridItemSize + endPartVisibleItem * daysInItem - 1;

    this.current.dateFullBegin = offsetOnDay(currentDate, daysFullBegin);
    this.current.dateFullEnd = offsetOnDay(currentDate, daysFullEnd);
    this.current.datePartBegin = offsetOnDay(currentDate, daysPartBegin);
    this.current.datePartEnd = offsetOnDay(currentDate, daysPartEnd);

    this.current.visibleDay = this.current.dateFullBegin;
    this.current.visibleMonth = getMonthDate(offsetOnDay(this.current.dateFullBegin, 10));
    this.current.visibleRateBegin = 100 * startRateRest / itemRate | 0;
    this.current.visibleRateEnd = 100 * endRateRest / itemRate | 0;
  },
};
