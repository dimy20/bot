const redis = require("redis");
// keep connections to this node here
//const connections= [];
const subscriber = redis.createClient({host : "redis", port : 6379});

const APPID = process.env.APPID;

class Clients {
  constructor(){
    this.clientsList ={};
    this.saveClient = this.saveClient.bind(this);
  }
  saveClient(id,client){
      this.clientsList[id] = client;
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
        console.log(clients.clientsList);
        const parsed_data = JSON.parse(data);
        try {
            const conn = clients.clientsList[parsed_data.conn_id];
            console.log
            console.log(`Server ${APPID} received message in channel ${channel} msg: ${conn.msg}`);
            conn.send(APPID + ":" + parsed_data.msg);
            
/*             for(let socket of clients.clientsList){
                socket.send(APPID + ":" + message);
            } */
        } catch (ex) {
            console.error(ex);
          
        }
});
subscriber.subscribe("livechat");

module.exports ={
  clients 
}
