import EventEmitter from './EventEmitter';

export default class StoreStrategy extends EventEmitter {
  state: {[id:string]: any};
  current: {[id:string]: any};
  isChanged: boolean;

  constructor (data: {[id:string]: any} = {}) {
    super();
    this.current = { ...data };
    this.isChanged = false;
    this.state = Object.create(null);

    /*::`*/
    const props = Object.keys(data).reduce((data, name) => {
      data[ name ] = {
        enumerable: true,
        get: () => this.current[ name ]
      };

      if (name !== name.toUpperCase()) {
        const sname = `_${name}Setter`;

        data[ name ].set = (value) => {
          if (sname in this) {
            this[ sname ](value);
          } else {
            this.current[ name ] = value;
            this.isChanged = true;
          }
        };
      }

      return data;
    }, {});

    Object.defineProperties(this.state, props);
    /*::`;*/
  }

  destroy () {
    super.destroy();
    this.current = undefined;
    this.state = undefined;
  }

  update (data: {[id:string]: any}): boolean {
    this.isChanged = false;

    if (!data) {
      return this.isChanged;
    }

    for (const name in data) {
      if (
        data.hasOwnProperty(name) &&
        name in this.state &&
        data[ name ] !== this.state[ name ]
      ) {
        this.state[ name ] = data[ name ];
      }
    }

    return this.isChanged;
  }
}
