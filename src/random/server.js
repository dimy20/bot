const net = require("net");
function isConnected(connections, new_socket) {
	if (typeof new_socket === "object" && new_socket.id != "undefined") {
		if (connections.length === 0) return false;
		for (let i = 0; i < connections.length - 1; i++) {
			if (new_socket.id === connections[i].id) return true;
		}
		return false;
	}
	return false;
}
const server = net.createServer((socket) => {
	const connections = [];
	socket.id = Math.floor(Math.random() * 1000);
	if (!isConnected(connections, socket)) {
		connections.push(socket);
		socket.write(socket.id + "has connected");
		socket.pipe(socket);
	}
	socket.on("data", (data) => {
		console.log(`data received from  ${socket.id}: `, data);
	});
});
server.listen(1337, "127.0.0.1");
