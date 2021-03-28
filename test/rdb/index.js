const ws = require("websocket");
const http = require("http");
const redis = require("redis");
const {connections}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
const publisher = redis.createClient({host : "redis", port : 6379});

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
      publisher.set(["hello","world","NX","EX",20],(err,res)=>{
          if(res === null) console.log("you are already connected");
          else console.log(res);
     });
      conn.on("pong",()=>{
          console.log("i received your ping!")
      })
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

function locking_test(){

}



httpServer.listen(1337,()=>{
  console.log(`Server now listening on port 80`);
})