import StoreStrategy from '../StoreStrategy';
import defaultState from './defaultState';

export default class Strategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
  }

  /**
   * @param {number} date
   * @returns {number} процент видимости даты
   */
  check (date: number): number {

  }

  isVisible (date: number): boolean {
    return (
      date >= this.current.datePartBegin &&
      date <= this.current.datePartEnd
    );
  }
}
