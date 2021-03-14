const stream = require("stream");
const net = require("net");
console.log("init");
const socket = new net.Socket({ writable: true });

socket.connect({ port: 1337, host: "127.0.0.1" });

socket.on("data", (data) => {
	const parsed = data.toString();
	console.log(parsed);
});
