"use-strict";
const fs = require("fs");
const http = require("http");
const stream = require("stream");
const eventEmitter = require("events").EventEmitter;
const httpAgent = require("_http_agent");
const mod = bindingObj["print"];
console.log(mod);
const handler2 = {
	get: function (target, prop, receiver) {
		return "world";
	},
	set: function (target, prop, receiver) {
		return "not allowed";
	},
};
const handler3 = {
	get: function (target, prop, receiver) {
		if (prop === "message2") {
			return "world";
		}
		return Reflect.get(...arguments);
	},
};
const proxy = new Proxy(target, handler3);
const server = http.createServer((req, res) => {
	// req is a readableStream and res is a writable stream response
	let body = "";
	req.setEncoding("utf-8");

	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", () => {
		try {
			const data = JSON.parse(body);
			res.write(typeof data);
			res.end();
		} catch (err) {
			res.statusCode = 400;
			return res.end(`error : ${err.message}`);
		}
	});
});
server.listen(1337);
//readFile();
