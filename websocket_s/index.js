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
function fakeRoom(name){
      rooms.saveRoom(name);
}
//inits fake rooms for testing
fakeRoom("room");
fakeRoom("room2");
websocket.on("request",async (request)=>{

      if(!originIsAllowed(request.origin)){
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
        }

      /*
        When a new connections is accepted a new file descriptor is associated with this new socket connection
      */
      const room_name = request.httpRequest.url.split("/")[2];
      console.log("new request to connec to ", room_name);

      const conn = request.accept(null,request.origin);
      const conn_id = uuid.v1().split("-")[0];
      rooms.addClientToRoom(room_name,conn_id,conn);
      logger();
      conn.on("open", ()=>{console.log("!Welcome")});
      conn.on("close", () => {console.log("connection closed")
        const r = rooms.roomsList[conn.roomName];
        r.removeClient(conn.id);
    })
      conn.on("message", message => {
          //publish the message to redis
          console.log(`${APPID} Received message ${message.utf8Data}`)
          const message_data = JSON.stringify({
              msg : message.utf8Data,
              room_id:room_name,
              user_id : conn_id
          });
          pub.publishData(message_data);
      })
});




httpServer.listen(process.env.PORT,()=>{
  console.log(`Server now listening on port 80`);
})