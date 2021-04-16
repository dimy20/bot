const ws = require("websocket");
const http = require("http");
const redis = require("redis");
const {clients}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();
const uuid = require("uuid");


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
      const conn_id = uuid.v1().split("-")[0];
      console.log("new user connected! ", conn_id);
      conn.on("open", ()=>{
        console.log("!Welcome")
      })
      conn.on("close", () => console.log("CLOSED!!!"))
      conn.on("message", message => {
          //publish the message to redis

          console.log(`${APPID} Received message ${message.utf8Data}`)
          const message_data = JSON.stringify({
              msg : message.utf8Data,
              conn_id : conn_id
          });
          publisher.publish("livechat",message_data);
      })

      setTimeout(() => conn.send(`Connected successfully to server ${APPID}`), 5000)

      clients.saveClient(conn_id,conn);
      
});




httpServer.listen(process.env.PORT,()=>{
  console.log(`Server now listening on port 80`);
})