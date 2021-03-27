const ws = require("websocket");
const http = require("http");
const redis = require("redis");
const {connections}= require("./subscriber");
const APPID = process.env.APPID;

const publisher = redis.createClient({host : "redis", port : 6379});
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

 
publisher.on("error", function(error) {
  console.error(error);
});


const httpServer= http.createServer();

httpServer.listen(1337,()=>{
  console.log(`Server now listening on port 80`);
})

const websocket = new ws.server({
  httpServer : httpServer 
})

websocket.on("request",(request)=>{
    if(!originIsAllowed(request.origin)){
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
      }
      const new_connection = request.accept(null,request.origin);
      new_connection.on("open", () => console.log("opened"))
      new_connection.on("close", () => console.log("CLOSED!!!"))
      new_connection.on("message", message => {
          //publish the message to redis
          console.log(`${APPID} Received message ${message.utf8Data}`)
          publisher.publish("livechat", message.utf8Data)
      })

      setTimeout(() => new_connection.send(`Connected successfully to server ${APPID}`), 5000)
      connections.push(new_connection);
});
