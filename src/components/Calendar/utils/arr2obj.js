export default function arr2obj (value) {
  const data = {};
  for (let i = 0, len = value.length; i < len; i++) {
     data[ value[ i ] ] = true;
  }
  return data;
}
