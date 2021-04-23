const ws = require("websocket");
const http = require("http");
const {rooms}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();
const uuid = require("uuid");
const {pub} = require("./publisher");

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
function logger(){
      console.log("logs comming from :", APPID);
      console.log(rooms.size());
      console.log(rooms.roomsList);
}

const websocket = new ws.server({
  httpServer : httpServer,
  keepalive: true,
  keepaliveInterval: 25000,
  dropConnectionOnKeepaliveTimeout:true,
  keepaliveGracePeriod: 10000
})
function fakeRoom(){
      rooms.saveRoom("room");
}
fakeRoom();
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
      const conn_id = uuid.v1().split("-")[0];
      rooms.addClientToRoom("room",conn_id,conn);
      logger();
      conn.on("open", ()=>{console.log("!Welcome")});
      conn.on("close", () => console.log("connection closed"))
      conn.on("message", message => {
          //publish the message to redis
          console.log(`${APPID} Received message ${message.utf8Data}`)
          const message_data = JSON.stringify({
              msg : message.utf8Data,
              room_id:"room",
              user_id : conn_id
          });
          pub.publishData(message_data);
      })
});




httpServer.listen(process.env.PORT,()=>{
  console.log(`Server now listening on port 80`);
})