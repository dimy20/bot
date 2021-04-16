const redis = require("redis");
// keep connections to this node here
//const connections= [];
const CHAT_CHANNEL = "livechat";
class Publisher{
    constructor(){
        this.publisher = redis.createClient({host : "redis", port : process.env.REDIS_PORT});
        this.publishData = this.publishData.bind(this);
    }
    publishData(data){
        this.publisher.publish(CHAT_CHANNEL,data)
    }
}

const pub = new Publisher();
pub.publisher.on("error", function(error) {
  console.error(error);
});
module.exports = {
    pub
}