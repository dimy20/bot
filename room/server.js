const net = require("net");
const http = require("http");
const WebSocket = require("ws");


const ws= new WebSocket.Server({ port: 1337});

ws.on('connection', function connection(socket) {

  socket.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  socket.send('something');
});





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
