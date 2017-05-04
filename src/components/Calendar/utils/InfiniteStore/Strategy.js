import { ASCROLL } from '../../constant';
import StoreStrategy from '../StoreStrategy';
import defaultState from './defaultState';

export default class Strategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    this.LIMIT_PREV = 1;
    this.LIMIT_NEXT = 2;
  }

  /**
   * Принудительное обновление через установку уникального значения updated в стейт.
   * @public
   * @return {boolean}
   */
  forceUpdated () {
    this.current.updated++;
    return true;
  }

  /**
   * Обновление позиции скрола.
   * @public
   * @param {number} deltaX
   * @param {number} deltaY
   * @return {boolean}
   */
  updateScrollByWheel (deltaX: number, deltaY: number) {
    deltaX = Math.ceil(deltaX / 2);
    deltaY = Math.ceil(deltaY / 2);

    deltaX = deltaX > 0 ?
      Math.min(deltaX, 100) :
      Math.max(deltaX, -100);

    deltaY = deltaY > 0 ?
      Math.min(deltaY, 100) :
      Math.max(deltaY, -100);

    const updX = deltaX !== 0 ? this.update({
      scrollX: this.current.scrollX + deltaX
    }) : false;

    const updY = deltaY !== 0 ? this.update({
      scrollY: this.current.scrollY + deltaY
    }) : false;

    const {
      scrollAnimation,
      speedScrollX,
      speedScrollY,
    } = this.current;

    this.current.speedScrollX = updX ? deltaX : 0;
    this.current.speedScrollY = updY ? deltaY : 0;

    if (scrollAnimation >= 0) {
      this.current.scrollAnimation = updX || updY ?
        ASCROLL.ON :
        ASCROLL.OFF;
    }

    return (
      updX ||
      updY ||
      scrollAnimation !== this.current.scrollAnimation ||
      speedScrollX !== this.current.speedScrollX ||
      speedScrollY !== this.current.speedScrollY
    );
  }

  /**
   * Проверка видимости блока списка.
   * @abstract
   * @param {number} offset номер блока
   * @returns {boolean}
   */
  isVisibleOffset (offset: number): boolean {
    return true;
  }

  /**
   * @abstract
   * @returns {Object}
   */
  getVisibleRange () {
    return {};
  }

  _limitScroll (value: number, min: number, max: number): number {
    return (
      value < min ? min :
      value > max ? max :
      Math.round(value)
    );
  }

  _limitScrollY (value: number): number {
    return this._limitScroll(
      value,
      this.current.scrollOffsetTop,
      this.current.scrollOffsetBottom
    );
  }

  _limitScrollX (value: number): number {
    return this._limitScroll(
      value,
      this.current.scrollOffsetLeft,
      this.current.scrollOffsetRight
    );
  }

  _correctLimitOffset (limit, value, size) {
    switch (limit) {
      case this.LIMIT_PREV:
        return value - size;
      case this.LIMIT_NEXT:
        return value + size;
      default:
        return value;
    }
  }

  _checkLimitOffset (scroll, offsetPrev, offsetNext): number {
    const scrollOffsetCenter = (offsetPrev + offsetNext) / 2;
    const scrollOffsetWidth = offsetPrev > offsetNext ?
      offsetPrev - offsetNext :
      offsetNext - offsetPrev;
    const centerOffsetWidth = scrollOffsetWidth / 2;
    const sign = scroll > scrollOffsetCenter ? 1 : -1;
    const scroll2CenterWidth = scroll > scrollOffsetCenter ?
      scroll - scrollOffsetCenter :
      scrollOffsetCenter - scroll;
    const rate = centerOffsetWidth ?
      sign * scroll2CenterWidth * 100 / centerOffsetWidth : 0;
    const rateCompare = 100 / this.current.listRange;

    if (rate <= -(rateCompare)) {
      return this.LIMIT_NEXT;

    } else if (rate >= rateCompare) {
      return this.LIMIT_PREV;
    }

    return 0;
  }

  _getVisibleRange (scroll, size) {
    const precision = 10000;
    const listRange = this.current.listRange;
    const itemSize = listRange * 2 + 1;
    const visibleStart = Math.abs(scroll / size);
    const visibleRateStart = precision - (visibleStart % 1 * precision | 0);
    let visibleEnd = visibleStart + 1;
    let visibleRateEnd = precision - visibleRateStart;

    if (visibleRateEnd === 0) {
      visibleEnd--;
      visibleRateEnd = precision;
    }

    return {
      [ (visibleStart | 0) - listRange ]: visibleRateStart / 100,
      [ (visibleEnd | 0) - listRange ]: visibleRateEnd / 100,
    };
  }
}
