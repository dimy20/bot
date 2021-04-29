// runs db_init(user,pass,db);
require("./db/index");
const net = require("net");
const server = net.createServer({});
const {room_model} = require("./db/room_model");
const ROOM_EVENTS = {
    CREATE_ROOM : "CREATE_ROOM",
    GET_ROOM: "GET_ROOM"
}
server.on("connection",(socket)=>{
    socket.on("data",(chunk)=>{
        const stream_data = JSON.parse(Buffer.from(chunk).toString());
        if(stream_data.type === ROOM_EVENTS.CREATE_ROOM){
            const room = new room_model(stream_data.data);
            room.save().then(res=>{
                socket.write(JSON.stringify(res));
            }).catch(err=>{
                console.log(err);
            })
        }
        if(stream_data.type === ROOM_EVENTS.GET_ROOM){
            room_model.findOne({name: stream_data.data.roomName}).then(result=>{
                if(!result) socket.write(JSON.stringify(""));
                else
                    socket.write(JSON.stringify(result));
            }).catch(err=>{
                console.log(err);
            })
        }
   })
   socket.on("end",()=>{
       console.log("endddd!");
   })


    socket.on('end',()=>{console.log("connection closed")});
});

server.on("error",(error)=>{console.log(error)});
server.listen(5000);