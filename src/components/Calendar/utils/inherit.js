export default function extend(child, parent) {
	const f = function () {};
	f.prototype = parent.prototype;
	child.prototype = new f();
	child.prototype.constructor = child;
	child.superclass = parent.prototype;
}
