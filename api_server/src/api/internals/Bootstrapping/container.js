const net = require("net");
const {IPC_CREATE_ROOM} = require("../constants/constants");
// this returns all the data related to the container creation if sucess
async function createRoom(room,cb){
    if(!room) return;
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
            //socket.emit("close");

    })
    socket.on("data",(chunk)=>{
        cb(JSON.parse(chunk.toString()));
    })
}
module.exports={
    createRoom
}