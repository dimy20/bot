const net = require("net");
const {IPC_CREATE_ROOM} = require("../constants/constants");
// this returns all the data related to the container creation if sucess
async function createRoom(room){
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
                connect: `ws://${process.env.DOMAIN_NAME}/aisdjasudhajda`,
                pwd: room.pwd,
                available : "next sunday"
            }
        }
            socket.write(JSON.stringify(room_json));
            socket.emit("close");

    })
}
module.exports={
    createRoom
}