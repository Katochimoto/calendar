import StoreStrategy from '../StoreStrategy';
import defaultState from './defaultState';

const LIMIT_PREV = 1;
const LIMIT_NEXT = 2;

class Strategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
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

  /**
   * Проверка видимости блока списка.
   * @abstract
   * @param {number} offset номер блока
   * @returns {boolean}
   */
  isVisibleOffset (offset: number): boolean {
    return true;
  }

  _getScrollXByOffset (offset: number): number {
    return (
      -1 * (offset + 1) *
      this.current.listRange *
      this.current.scrollWidth
    );
  }

  _getScrollYByOffset (offset: number): number {
    return (
      -1 * (offset + 1) *
      this.current.listRange *
      this.current.scrollHeight
    );
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

  _correctScroll (limit, scroll, size) {
    switch (limit) {
      case LIMIT_PREV:
        return scroll - size;
      case LIMIT_NEXT:
        return scroll + size;
      default:
        return scroll;
    }
  }

  _correctScrollX () {
    const limit = this._checkLimitOffsetX();
    this.current.scrollX = this._limitScrollX(this._correctScroll(
      limit,
      this.current.scrollX,
      this.current.scrollWidth
    ));
  }

  _correctScrollY () {
    const limit = this._checkLimitOffsetY();
    this.current.scrollY = this._limitScrollY(this._correctScroll(
      limit,
      this.current.scrollY,
      this.current.scrollHeight
    ));
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
    const rate = centerOffsetWidth ? sign * scroll2CenterWidth * 100 / centerOffsetWidth : 0;
    const rateCompare = 100 / this.current.listRange;

    if (rate <= -(rateCompare)) {
      this.emitSync('next');
      return LIMIT_NEXT;

    } else if (rate >= rateCompare) {
      this.emitSync('prev');
      return LIMIT_PREV;
    }

    return 0;
  }

  _checkLimitOffsetX (): number {
    return this._checkLimitOffset(
      this.current.scrollX,
      this.current.scrollOffsetLeft,
      this.current.scrollOffsetRight
    );
  }

  _checkLimitOffsetY (): number {
    return this._checkLimitOffset(
      this.current.scrollY,
      this.current.scrollOffsetTop,
      this.current.scrollOffsetBottom
    );
  }
}

export class StrategyX extends Strategy {

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

  _scrollHeightSetter (value) {
    const scrollHeight = this.current.scrollHeight;

    this.current.scrollHeight = value;
    this.current.scrollOffsetTop = -1 * value;

    this.current.scrollY = this._limitScrollY(
      this.current.scrollY === undefined ? this._getScrollYByOffset(0) :
      scrollHeight > 0 ? this.current.scrollY * value / scrollHeight :
      0
    );

    this.isChanged = true;
  }

  _scrollWidthSetter (value) {
    const scrollWidth = this.current.scrollWidth;

    this.current.scrollWidth = value;
    // -2 потому что listRange слева и справа
    this.current.scrollOffsetLeft = -2 * this.current.listRange * value;

    this.current.scrollX = this._limitScrollX(
      this.current.scrollX === undefined ? this._getScrollXByOffset(0) :
      scrollWidth > 0 ? this.current.scrollX * value / scrollWidth :
      0
    );

    this._correctScrollX();
    this.isChanged = true;
  }

  _scrollXSetter (value) {
    value = this._limitScrollX(value);
    if (value !== this.current.scrollX) {
      this.current.scrollX = value;
      this._correctScrollX();
      this.isChanged = true;
    }
  }

  _scrollYSetter (value) {
    value = this._limitScrollY(value);
    if (value !== this.current.scrollY) {
      this.current.scrollY = value;
      this.isChanged = true;
    }
  }
}

export class StrategyY extends Strategy {

  isVisibleOffset (offset: number): boolean {
    const { scrollY, scrollHeight, listRange, speedScrollY } = this.current;
    const min = this._getScrollYByOffset(offset);
    const max = min - scrollHeight;
    const maxOffset = scrollY / listRange;
    const minOffset = scrollY - scrollHeight * listRange;

    return scrollY !== undefined && !Boolean(
      (max > maxOffset) ||
      (max === maxOffset && speedScrollY <= 0) ||
      (min < minOffset) ||
      (min === minOffset && speedScrollY >= 0)
    );
  }

  _scrollHeightSetter (value) {
    const scrollHeight = this.current.scrollHeight;

    this.current.scrollHeight = value;
    // -2 потому что listRange сверху и снизу
    this.current.scrollOffsetTop = -2 * this.current.listRange * value;

    this.current.scrollY = this._limitScrollY(
      this.current.scrollY === undefined ? this._getScrollYByOffset(0) :
      scrollHeight > 0 ? this.current.scrollY * value / scrollHeight :
      0
    );

    this._correctScrollY();
    this.isChanged = true;
  }

  _scrollWidthSetter (value) {
    const scrollWidth = this.current.scrollWidth;

    this.current.scrollWidth = value;
    this.current.scrollOffsetLeft = -1 * value;

    this.current.scrollX = this._limitScrollX(
      this.current.scrollX === undefined ? this._getScrollXByOffset(0) :
      scrollWidth > 0 ? this.current.scrollX * value / scrollWidth :
      0
    );

    this.isChanged = true;
  }
}
