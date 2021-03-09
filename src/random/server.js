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
/*
    upon connection, a message must be sent to all connected users
    except the recently connected user notifying the new connected user 
    maybe this can be changed into something like socket.broadcast(args);
    socket.broadcast = function(args){ do_something }
*/
function broadcast(connections, server_socket) {
	console.log(connections);
	for (let i = 0; i < connections.length - 1; i++) {
		if (connections[i].id != server_socket.id) {
			/* 			server_socket.emit("message", {
				msg: `${server_socket.id} has connected to the server`,
            }); */
			console.log("senddd!");
			server_socket.write(
				`${server_socket.id} has connected to the server`
			);
		}
	}
}
const server = net.createServer((socket) => {
	const connections = [];
	// use better ids
	socket.id = Math.floor(Math.random() * 1000);
	if (!isConnected(connections, socket)) {
		connections.push(socket);
		socket.write("you have connected");
		socket.pipe(socket);
	}
	broadcast(connections, socket);
	socket.on("data", (data) => {
		console.log(`data received from  ${socket.id}: `, data);
	});
});
server.listen(1337, "127.0.0.1");
