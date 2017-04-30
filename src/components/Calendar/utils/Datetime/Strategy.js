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

const MONTH_GEN = {
  '1': 'Января',
  '2': 'Февраля',
  '3': 'Марта',
  '4': 'Апреля',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Августа',
  '9': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
};

const MONTH_GEN_SHORT = {
  '1': 'Янв.',
  '2': 'Фев.',
  '3': 'Мар.',
  '4': 'Апр.',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Авг.',
  '9': 'Сент.',
  '10': 'Окт.',
  '11': 'Ноя.',
  '12': 'Дек.',
};

export default class Strategy {
  gridDaysHourTitle (hour: number): string {
    return String(hour);
  }

  gridDaysDayTitle (date: Date): string {
    return `${DAYS[ date.getDay() ]}, ${date.getDate()}`;
  }

  monthNameGenShort (date: Date): string {
    return MONTH_GEN_SHORT[ date.getMonth() + 1 ];
  }
}
