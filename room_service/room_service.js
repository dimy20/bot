// runs db_init(user,pass,db);
require("./db/index");
const net = require("net");
const server = net.createServer({});
const {room_model} = require("./db/room_model");

server.on("connection",(socket)=>{
    socket.on("data",(chunk)=>{
        const stream_data = JSON.parse(Buffer.from(chunk).toString());
        if(stream_data.type === "create_room"){
            const room = new room_model(room_data);
            room.save().then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })
        }
        if(stream_data.type === "retrieve_room"){
            room_model.findOne({name: stream_data.data.roomName}).then(result=>{
                if(result){

            socket.write(JSON.stringify(result));
                }else{

                socket.write(JSON.stringify(""));
                }
                
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