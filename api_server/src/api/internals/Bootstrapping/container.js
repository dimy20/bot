const net = require("net");
// this returns all the data related to the container creation if sucess
async function createRoom(name){
    const socket = net.connect({
        port : 5000,
        host : "room_service"
    })
    socket.on("connect",()=>{
        
            const room_json = {
                host: "negro gil",
                name,
                expires:24,
                connect: "ws://callysto.com/aisdjasudhajda",
                pwd: "pepuda la pistolera",
                available : "next sunday"
            }
            const json_data = JSON.stringify(room_json);
            socket.write(json_data);

    })
}
module.exports={
    createRoom
}