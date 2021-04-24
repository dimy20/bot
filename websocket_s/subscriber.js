const redis = require("redis");
// keep connections to this node here
const subscriber = redis.createClient({host : "redis", port : process.env.REDIS_PORT});

const APPID = process.env.APPID;
class Rooms{
  constructor(){
    this.roomsList={};
    this.saveRoom= this.saveRoom.bind(this);
  }
  saveRoom(id){
      this.roomsList[id] = {
        id : id,
        clients : []
      }
  }
  addClientToRoom(room_id,client_id,websocketConnection){
    console.log(this.isRoomValid(room_id));
    if(this.size() > 0 && this.isRoomValid(room_id)){
/*       this.roomsList[room_id].clients[client_id] = websocketConnection; */
        this.roomsList[room_id].clients.push({
          websocketConnection,
          client_id
        });
    }
   return 0; 
  }
  /*Validates if room exists*/
  isRoomValid(room_name){
    return typeof this.roomsList[room_name] !== 'undefined'
  }
  getClientsFromRoom(roomid){
    return this.roomsList[roomid].clients;
  }
  size(){
    return Object.entries(this.roomsList).length;
  }
}
const rooms= new Rooms();

subscriber.on("error", function(error) {
  console.error(error);
});
subscriber.on("subscribe", function(channel,count){
      console.log(`Server ${APPID} subscribed successfully to livechat`)
});
subscriber.on("message",(channel,data)=>{
        console.log("subscriber on : ", APPID);
        const parsed_data = JSON.parse(data);
        try {
            // check if there actually are stablished connections, 
            // STUDY WHY THIS IS ZERO FOR A SHORT PERIOD
            if(!rooms.isRoomValid(parsed_data.room_id)) throw new Error("Invalid room name");
            const room = rooms.roomsList[parsed_data.room_id];
            
            if(Object.entries(room.clients).length > 0 ){

            //   const conn = rooms.roomsList[parsed_data.conn_id];
                for(conn of room.clients){
                  conn.websocketConnection.send(APPID + "user : " + parsed_data.user_id + ":" + parsed_data.msg);
                }
                console.log(`Server ${APPID} received message in channel ${channel} msg: ${parsed_data.msg}`);

            } 
            
        } catch (ex) {
            console.error(ex);
          
        }
});
subscriber.subscribe("livechat");

module.exports ={
  rooms,
}
