const net = require("net");
//const uuid = require("uuid");

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
/*
    upon connection, a message must be sent to all connected users
    except the recently connected user notifying the new connected user 
    maybe this can be changed into something like socket.broadcast(args);
    socket.broadcast = function(args){ do_something }
*/
function broadcast(connections, server_socket) {
	console.log(connections.length);
	for (let i = 0; i < connections.length; i++) console.log(connections[i].id);
	for (let i = 0; i < connections.length - 1; i++) {
		if (connections[i].id != server_socket.id) {
			connections[i].write(
				`${server_socket.id} has connected to the server\n`
			);
		}
	}
}
let connections = [];
const server = net.createServer((socket) => {
    console.log(socket);
	// use better ids
//	socket.id = uuid.v1();
	if (!isConnected(connections, socket)) {
		connections.push(socket);
		socket.write("you have connected \n");
		socket.pipe(socket);
	}
	broadcast(connections, socket);
	socket.on("data", (data) => {
		console.log(`data received from  ${socket.id}: `, data);
	});
});
// having 127.0.0.1 was the problem, investigate why
server.listen(1337, "0.0.0.0");
