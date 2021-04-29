const net = require("net");
const {enum_ipc_request} = require("../constants/constants");
// this returns all the data related to the container creation if success
async function ipc_create_room(room){
    if(!room) return;
    return new Promise((resolve,reject)=>{
            const socket = net.connect({
                port : 5000,
                host : "room_service"
            })

            socket.on("connect",()=>{
                const room_json = {
                    type : enum_ipc_request.create_room,
                    data : {
                            name: room.name,
                            expires:room.expiration,
                            max_connections: room.max_connections,
                            connect: `ws://${process.env.DOMAIN_NAME}/${room.name}`,
                            pwd: room.pwd,
                            available : "next sunday"
                    }
                 }
                socket.write(JSON.stringify(room_json));
            })

            socket.on("data",(chunk)=>{
                const res =  JSON.parse(chunk.toString());
                if(res.success){
                    socket.destroy();
                    resolve(res.data);
                }
                if(res.error) {socket.destroy(); reject(res.error);}
            })
    })


}
module.exports={
   ipc_create_room 
}