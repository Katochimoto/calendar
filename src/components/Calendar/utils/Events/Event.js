import Store from '../Store';
import StoreStrategy from '../StoreStrategy';

export default class Event extends Store {

  static create (data) {
    return new Event(data);
  }

  constructor (data) {
    super(new StoreStrategy(data));

    /*::`*/
    const props = Object.keys(data).reduce((data, name) => {
      data[ name ] = {
        enumerable: true,
        get: () => this.getState()[ name ]
      };

      return data;
    }, {});

    Object.defineProperties(this, props);
    /*::`;*/
  }

  valueOf () {

  }

}
