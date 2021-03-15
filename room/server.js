const net = require("net");
const http = require("http");
const app = require("express")();
const webSocketServer = require("websocket").server;
const server = http.createServer(app);

app.get("/",(req,res)=>{res.json({msg:"hello"})});

server.listen(80);

// upgrade-to request headers upgradres to wbsocket protocol

const wsServer = new webSocketServer({httpServer : server, autoAcceptConnections : false});

wsServer.on("request",(request)=>{
         const connection = request.accept("echo-protocol",request.origin);
            console.log(request.url);

         connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    console.log('Received Message: ' + message.utf8Data);
                    connection.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    connection.sendBytes(message.binaryData);
                }
            });
            connection.on('close', function(reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });
})


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
/*let connections = [];
const server = net.createServer((socket) => {
    console.log(socket.url);
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
