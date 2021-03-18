const WebSocket = require("ws");
const PORT = 1337;
const ws = new WebSocket(`ws://localhost:${PORT}`);

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
