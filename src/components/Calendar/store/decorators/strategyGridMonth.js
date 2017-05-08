import {
  offsetOnDay,
  WEEKDAYS,
} from '../../utils/date';

export function strategyGridMonth (component) {
  Object.assign(component.prototype, protoGridMonth);
}

export function strategyGridMonthConstructor () {

}

const protoGridMonth = {
  gridDateOffset (date: number, offset: number): number {
    return offsetOnDay(date, offset);
  },

  gridDateItemOffset (date: number, offset: number): number {
    const dayOffset = this.current.gridMonthItemSize * offset * WEEKDAYS;
    return this.gridDateOffset(date, dayOffset);
  },

  _gridDateOffsetNext () {
    this.current.updated++;
    this.current.currentDate = this.gridDateItemOffset(
      this.current.currentDate,
      1
    );
  },

  _gridDateOffsetPrev () {
    this.current.updated++;
    this.current.currentDate = this.gridDateItemOffset(
      this.current.currentDate,
      -1
    );
  },
};
