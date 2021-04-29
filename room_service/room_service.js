// runs db_init(user,pass,db);
require("./db/index");
const net = require("net");
const server = net.createServer({});
const {room_model} = require("./db/room_model");
const ROOM_EVENTS = {
    CREATE_ROOM : "CREATE_ROOM",
    GET_ROOM: "GET_ROOM"
}
class Response{
    constructor(success,data,error){
        this.success = success;
        this.data = data;
        this.error = error;
    }
}
server.on("connection",(socket)=>{
    socket.on("data",(chunk)=>{
        const stream_data = JSON.parse(Buffer.from(chunk).toString());
        if(stream_data.type === ROOM_EVENTS.CREATE_ROOM){
            //check if room exists
            const room = new room_model(stream_data.data);
            room
            .save()
            .then(res=>{
                socket.write(JSON.stringify(new Response(true,res,null)));
            })
            .catch(err=>{
                //notify error back to service requesting
                socket.write(JSON.stringify(new Response(false,null,err)));
            })
        }
        if(stream_data.type === ROOM_EVENTS.GET_ROOM){
            room_model.findOne({name: stream_data.data.roomName})
            .then(res=>{
                if(!result) socket.write(JSON.stringify(new Response(true,res,null)));
                else
                    socket.write(JSON.stringify(new Response(true,`room ${stream_data.data.roomName} was not found`,null)));
            }).catch(err=>{
                console.log(err);
            })
        }
   })
    socket.on('end',()=>{console.log("connection closed")});
});

server.on("error",(error)=>{console.log(error)});
server.listen(process.env.PORT,()=>{
    `room service listening on port ${process.env.PORT}`
});