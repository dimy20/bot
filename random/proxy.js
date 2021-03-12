const fs = require("fs");
const test = process.binding();
console.log(test);
function extend(sup, base) {
	var descriptor = Object.getOwnPropertyDescriptor(
		base.prototype,
		"constructor"
	);

	base.prototype = Object.create(sup.prototype);
	var handler = {
		construct: function (target, args) {
			var obj = Object.create(base.prototype);
			this.apply(target, obj, args);
			return obj;
		},
		apply: function (target, that, args) {
			sup.apply(that, args);
			base.apply(that, args);
		},
	};
	var proxy = new Proxy(base, handler);
	descriptor.value = proxy;
	Object.defineProperty(base.prototype, "constructor", descriptor);
	return proxy;
}
var Person = function (name) {
	this.name = name;
};

var Boy = extend(Person, function (name, age) {
	this.age = age;
});

Boy.prototype.gender = "M";

var Peter = new Boy("Peter", 13);

console.log(Peter.gender); // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age); // 13
