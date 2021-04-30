const ws = require("websocket");
const http = require("http");
const {rooms}= require("./subscriber");
const APPID = process.env.APPID;
const httpServer= http.createServer();
const uuid = require("uuid");
const {pub} = require("./publisher");
const {ipc_get_room} = require("./internals/ipc/ipc");
function originIsAllowed(origin) {
  //maybe check here if room exists.
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
      let conn = null;
      let conn_id = "";
      /*
        When a new connections is accepted a new file descriptor is associated with this new socket connection
      */
      const room_name = request.httpRequest.url.split("/")[2];
      try {
        //this should only happen if the room is not in memory for users to connect, otherwise each time a users tries to connect, the same
          // room will be appended to the rooms list, a noticeble bug
         if(!rooms.isLoaded(room_name)){
           /*load room data from db through rooms service and creates live representation on memory for users to connect 
            this approach is done for optimization porpuses
           */
            const room = await ipc_get_room(room_name);
            rooms.saveRoom(room.name);

         }
            conn = request.accept(null,request.origin);
            conn_id = uuid.v1().split("-")[0];
          //improve this
          rooms.addClientToRoom(room_name,conn_id,conn);
           //if room is already loaded into memory, meaning some users have connected already, then  just connect

        console.log(res);
      } catch (error) {
        console.log(error);
      }
      
      console.log("new request to connec to ", room_name);

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