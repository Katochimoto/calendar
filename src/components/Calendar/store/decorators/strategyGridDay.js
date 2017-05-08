import {
  offsetOnDay,
  offsetOnWorksDay,
} from '../../utils/date';

export function strategyGridDay (component) {
  Object.assign(component.prototype, protoGridDay);
}

export function strategyGridDayConstructor () {

}

const protoGridDay = {
  gridDateOffset (date: number, offset: number): number {
    if (this.current.hideWeekends) {
      return offsetOnWorksDay(date, offset, this.current.WEEKENDS_SET);

    } else {
      return offsetOnDay(date, offset);
    }
  },

  gridDateItemOffset (date: number, offset: number): number {
    const dayOffset = this.current.gridDaysItemSize * offset;
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
