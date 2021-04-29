const net = require("net");
const {IpcRequest} = require("../internals");
const {enum_ipc_request} = require("../constants")
function ipc_get_room(room_name){
    return new Promise((resolve,reject)=>{

    const socket = net.connect({
        port : 5000, //add env
        host : "room_service" // add to env
    })
    socket.on("connect",()=>{
        const request = new IpcRequest(enum_ipc_request.get_room,{room_name});
        socket.write(JSON.stringify(request));
    })
    socket.on("data",(chunk)=>{
        const room_data = JSON.parse(chunk.toString());
        if(!room_data) reject(new Error("No response from room service"));
        if(room_data.success){
            socket.destroy();
            resolve(room_data.data);
        }
        
        
        if(room_data.error){
            socket.destroy();
            reject(room_data.error);
        }
        
    })

    socket.on("error",(error)=>{
            socket.destroy();
            reject(error);
    })

    })}
module.exports={
   ipc_get_room
} 