const WebSocket = require("ws");
const ws = new WebSocket('ws://localhost',['json']);
// Add a listener that will be triggered when the WebSocket is ready to use
ws.addEventListener('open', () => {
  const data = { message: 'Hello' }
  const json = JSON.stringify(data);
  // Send the message to the WebSocket server
  ws.send(json);
});
// Add a listener in order to process WebSocket messages received from the server
ws.addEventListener('message', event => {
  // The `event` object is a typical DOM event object, and the message data sent
  // by the server is stored in the `data` property
  console.log('Received:', event.data);
});
