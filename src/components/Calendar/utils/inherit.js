const setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

export default function extend(child, parent) {
	child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      writable: true,
      configurable: true
    },

		super: {
			value: parent,
      writable: true,
      configurable: true
		}
  });

	setPrototypeOf(child, parent);
}
