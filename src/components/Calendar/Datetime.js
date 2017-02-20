export default function Datetime (strategy) {

}

Datetime.prototype = {
  getHourTitle (hour) {
    return String(hour);
  },

  offsetDay (date, offset) {
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const offsetDate = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + offset));
      return `${offsetDate.getFullYear()}-${offsetDate.getMonth() + 1}-${offsetDate.getDate()}`;
    }
  }
};
