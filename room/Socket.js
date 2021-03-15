const stream = require("stream");
const net = require("net");
console.log("init");
const socket = new net.Socket({ writable: true });

socket.connect(1337,"127.0.0.1");
socket.on("connection",(data)=>{console.log(data)});

socket.on("data", (data) => {
	const parsed = data.toString();
	console.log(parsed);
});
