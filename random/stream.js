"use-strict";
const fs = require("fs");
const http = require("http");
const stream = require("stream");
const eventEmitter = require("events").EventEmitter;
const net = require("net");
const connection = net.connect(8080, "google.com", () => {
	console.log("connected to google.com");
});

const connect = net.connect({
	handle,
});

const normalizedArgsSymbol = Symbol("is_normalized");
function normalizeArgs(args) {
	let arr;

	if (args.length === 0) {
		arr = [{}, null];
		arr[normalizedArgsSymbol] = true;
		return arr;
	}

	const arg0 = args[0];
	let options = {};
	if (typeof arg0 === "object" && arg0 !== null) {
		// (options[...][, cb])
		options = arg0;
	} else if (isPipeName(arg0)) {
		// (path[...][, cb])
		options.path = arg0;
	} else {
		// ([port][, host][...][, cb])
		options.port = arg0;
		if (args.length > 1 && typeof args[1] === "string") {
			options.host = args[1];
		}
	}

	const cb = args[args.length - 1];
	if (typeof cb !== "function") arr = [options, null];
	else arr = [options, cb];

	arr[normalizedArgsSymbol] = true;
	return arr;
}
function toNumber(x) {
	return (x = Number(x)) >= 0 ? x : false;
}

function isPipeName(s) {
	return typeof s === "string" && toNumber(s) === false;
}
/* const server = http.createServer((req, res) => {
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
server.listen(1337); */
//readFile();
