const stream = require("stream");
const net = require("net");

function Socket(options) {
	this.name = "socket";
	Reflect.apply(stream.Duplex, this, [options]);
}

const socket = new Socket({ port: 80, host: "google.com" });
const obj = {
    data : "this is some data"
}

console.log(obj.hasOwnProperty('xd'));
