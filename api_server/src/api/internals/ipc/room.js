const net = require("net");
const {IPC_CREATE_ROOM} = require("../constants/constants");
// this returns all the data related to the container creation if sucess
async function createRoom(room){
    if(!room) return;
    return new Promise((resolve,reject)=>{
            const socket = net.connect({
                port : 5000,
                host : "room_service"
            })

            socket.on("connect",()=>{
                const room_json = {
                    type : IPC_CREATE_ROOM,
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
                    socket.emit("close");
                    resolve(res.data);
                }
                if(res.error) reject(res.error);
            })
    })


}
module.exports={
    createRoom
}