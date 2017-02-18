export default function getListOffset ({ listOffset, scrollX, scrollOffsetLeft, scrollOffsetRight }) {
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

  return do {
    if (rate <= -100) {
      ++listOffset;
    } else if (rate >= 100) {
      --listOffset;
    } else {
      listOffset;
    }
  };
}
