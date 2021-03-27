const redis = require("redis");
const connections= [];
const subscriber = redis.createClient({host : "redis", port : 6379});

const APPID = process.env.APPID;

subscriber.on("error", function(error) {
  console.error(error);
});

subscriber.on("subscribe", function(channel,count){
      console.log(`Server ${APPID} subscribed successfully to livechat`)
});
subscriber.on("message",(channel,message)=>{

        try {
            console.log(`Server ${APPID} received message in channel ${channel} msg: ${message}`);
            for(let socket of connections){
                socket.send(APPID + ":" + message);
            }
        } catch (ex) {
            console.error(ex);
          
        }
});
subscriber.subscribe("livechat");

module.exports ={
   connections 
}
