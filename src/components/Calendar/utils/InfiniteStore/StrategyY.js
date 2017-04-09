import Strategy from './Strategy';

export default class StrategyY extends Strategy {
  constructor (data: {[id:string]: any}) {
    super(data);
    this.current.SAXISX = false;
  }

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

  _getScrollYByOffset (offset: number): number {
    return (
      -1 * (offset + 1) *
      this.current.listRange *
      this.current.scrollHeight
    );
  }

  _correctScrollY () {
    this.current.scrollY = this._limitScrollY(this._correctScroll(
      this._checkLimitOffsetY(),
      this.current.scrollY,
      this.current.scrollHeight
    ));
  }

  _checkLimitOffsetY (): number {
    return this._checkLimitOffset(
      this.current.scrollY,
      this.current.scrollOffsetTop,
      this.current.scrollOffsetBottom
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
      scrollWidth > 0 ? this.current.scrollX * value / scrollWidth :
      0
    );

    this.isChanged = true;
  }

  _scrollXSetter (value) {
    value = this._limitScrollX(value);
    if (value !== this.current.scrollX) {
      this.current.scrollX = value;
      this.isChanged = true;
    }
  }

  _scrollYSetter (value) {
    value = this._limitScrollY(value);
    if (value !== this.current.scrollY) {
      this.current.scrollY = value;
      this._correctScrollY();
      this.isChanged = true;
    }
  }
}
