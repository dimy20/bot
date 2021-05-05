const redis = require("redis");
const {RoomList} = require("./internals/internals");
const subscriber = redis.createClient({host : "redis", port : process.env.REDIS_PORT});
const APPID = process.env.APPID;
const rooms = new RoomList(); 

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
            if(!rooms.isLoaded(parsed_data.room_id)) throw new Error("Invalid room name");
            const room = rooms.roomsList[parsed_data.room_id];

            if(Object.entries(room.clients).length > 0 ){
              
            //   const conn = rooms.roomsList[parsed_data.conn_id];
                for(conn of room.clients){
              console.log(conn.websocketConnection);
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
