const ws = require("websocket");
const http = require("http");
const redis = require("redis");
const {connections}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();
class Clients {
  constructor(){
    this.clientsList ={};
    this.saveClient = this.saveClient.bind(this);
  }
  saveClient(id,client){
      this.saveClient[id] = client;
  }
}

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
const publisher = redis.createClient({host : "redis", port : process.env.REDIS_PORT});

publisher.on("error", function(error) {
  console.error(error);
});



const websocket = new ws.server({
  httpServer : httpServer,
  keepalive: true,
  keepaliveInterval: 25000,
  dropConnectionOnKeepaliveTimeout:true,
  keepaliveGracePeriod: 10000
})

websocket.on("request",async (request)=>{
    if(!originIsAllowed(request.origin)){
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
      }
      const conn = request.accept(null,request.origin);

      conn.on("open", ()=>{
        console.log("!Welcome")
      })
      conn.on("close", () => console.log("CLOSED!!!"))
      conn.on("message", message => {
          //publish the message to redis

          console.log(`${APPID} Received message ${message.utf8Data}`)
          publisher.publish("livechat", message.utf8Data)
      })

      setTimeout(() => conn.send(`Connected successfully to server ${APPID}`), 5000)
      connections.push(conn);
});




httpServer.listen(process.env.PORT,()=>{
  console.log(`Server now listening on port 80`);
})