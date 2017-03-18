export default function getColumn (time, columns) {
  return do {
    if (columns[0] <= time) {
      0;
    } else if (columns[1] <= time) {
      1;
    } else if (columns[2] <= time) {
      2;
    } else if (columns[3] <= time) {
      3;
    } else if (columns[4] <= time) {
      4;
    } else if (columns[5] <= time) {
      5;
    } else {
      columns.length;
    }
  };
}
