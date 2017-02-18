export default function limitScroll (value, min, max) {
  return value < min ? min : value > max ? max : Math.round(value);
}
