// runs db_init(user,pass,db);
require("./db/index");
const net = require("net");
const server = net.createServer({});
const {room_model} = require("./db/room_model");

server.on("connection",(socket)=>{
    socket.on("data",(chunk)=>{
        const room_data = JSON.parse(Buffer.from(chunk).toString());
        console.log(room_data);
        const room = new room_model(room_data);
        room.save().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
    })
    socket.on('end',()=>{console.log("connection closed")});
});

server.on("error",(error)=>{console.log(error)});
server.listen(5000);