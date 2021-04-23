const ws = require("websocket");
const http = require("http");
const redis = require("redis");
const {clients,connections}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();
const uuid = require("uuid");
const {pub} = require("./publisher");

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
/* const publisher = redis.createClient({host : "redis", port : process.env.REDIS_PORT});

publisher.on("error", function(error) {
  console.error(error);
}); */


const websocket = new ws.server({
  httpServer : httpServer,
  keepalive: true,
  keepaliveInterval: 25000,
  dropConnectionOnKeepaliveTimeout:true,
  keepaliveGracePeriod: 10000
})

    let test = [];
    const add = (conn)=>test.push(conn);
websocket.on("request",async (request)=>{
      console.log("new request!");
      if(!originIsAllowed(request.origin)){
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
        }
      /*
        When a new connections is accepted a new file descriptor is associated with this new socket connection
      */

      const conn = request.accept(null,request.origin);
      
      add("xd");
      console.log("logs comming from :", APPID);
      console.log(test);
      console.log(test.length);

      const conn_id = uuid.v1().split("-")[0];
      clients.saveClient(conn_id,conn);


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
          pub.publishData(message_data);
      })




      
});




httpServer.listen(process.env.PORT,()=>{
  console.log(`Server now listening on port 80`);
})