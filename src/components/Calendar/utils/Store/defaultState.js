import { HOURMS } from '../date';
import { toObject, createIntervals } from '../array';

const HOURS = '0,1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23'; //,7,8
const HOURS_LIST = HOURS.split(',').map(Number);
const INTERVALS = createIntervals(HOURS_LIST);
const DAYMS = HOURS_LIST.length * HOURMS;
const GRID_HOURS = toObject(HOURS_LIST);

const WEEKENDS = '0,6';
const WEEKENDS_SET = toObject(WEEKENDS.split(',').map(Number));

export default {
  updated: 0,
  scrollHeight: 0,
  scrollWidth: 0,

  /**
   * максимальное смещение при скроле влево = -1 * scrollWidth * ( listRange * 2 )
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetLeft: 0,

  /**
   * максимальное смещение при скроле вправо
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetRight: 0,

  /**
   * максимальное смещение при скроле вверх = -1 * scrollHeight
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetTop: 0,

  /**
   * максимальное смещение при скроле вниз
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetBottom: 0,
  scrollX: undefined,
  scrollY: 0,

  listRange: 1,

  //stickyScrollX: false,   // ? залипающий скролл по X
  //stepScrollX: false,     // ? пошаговый скролл по X
  //freeScrollX: false,     // ? свободный скролл по X
  //freeScrollY: false,     // ? свободный скролл по Y

  speedScrollX: 0,
  speedScrollY: 0,

  //gridHeight: 0,
  //viewportHeight: 0,
  //viewportMinutesBegin: 0,
  //viewportMinutesEnd: 0,

  gridDaysItemSize: 7,
  //gridWeekListItemSize: 1,  // количество недель в одном элементе InfiniteList

  //grid: 'day',
  currentDate: 2017.0227,
  hoursOfDay: HOURS,

  /**
   * Объект соответствия рабочего часа с реальным положением в сетке
   * @constant {Object.<string, number>}
   */
  GRID_HOURS: GRID_HOURS,

  DAYMS: DAYMS,

  INTERVALS: INTERVALS,

  weekends: WEEKENDS,

  /**
   * Объект дней недели
   * @constant {Object.<string, number>}
   */
  WEEKENDS_SET: WEEKENDS_SET,

  hideWeekends: false,
  beginningOfWeek: 1
};
