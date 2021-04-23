const redis = require("redis");
// keep connections to this node here
const subscriber = redis.createClient({host : "redis", port : process.env.REDIS_PORT});

const APPID = process.env.APPID;

class Clients {
  constructor(){
    this.clientsList ={};
    this.saveClient = this.saveClient.bind(this);
  }
  saveClient(id,client){
      this.clientsList[id] = client;
  }
  size(){
    return Object.entries(this.clientsList).length;
  }
}
const clients = new Clients();

subscriber.on("error", function(error) {
  console.error(error);
});
subscriber.on("subscribe", function(channel,count){
      console.log(`Server ${APPID} subscribed successfully to livechat`)
});
subscriber.on("message",(channel,data)=>{
        console.log(connections.length);
        const parsed_data = JSON.parse(data);
        try {
            // check if there actually are stablished connections, 
            // STUDY WHY THIS IS ZERO FOR A SHORT PERIOD
            
            if(Object.entries(clients.clientsList).length > 0 ){

                const conn = clients.clientsList[parsed_data.conn_id];
                console.log(`Server ${APPID} received message in channel ${channel} msg: ${parsed_data.msg}`);
                conn.send(APPID + ":" + parsed_data.msg);
            } 

        } catch (ex) {
            console.error(ex);
          
        }
});
subscriber.subscribe("livechat");

module.exports ={
  clients,
}
