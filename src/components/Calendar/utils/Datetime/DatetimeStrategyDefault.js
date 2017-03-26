// @flow

const DAYS = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat'
};

export default class DatetimeStrategyDefault {
  gridDaysHourTitle (hour: number): string {
    return String(hour);
  }

  gridDaysDayTitle (date: Date): string {
    return `${DAYS[ date.getDay() ]}, ${date.getDate()}`;
  }
}
