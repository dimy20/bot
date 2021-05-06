require("./db/index");
const {user_model} = require("./db/user_model");
const net = require("net");
const server = net.createServer();

server.on("connection",(socket)=>{
    socket.on("connect",(data)=>{
        console.log(data);
    })
    socket.on("data",(chunk)=>{
        const data = chunk.toString();
        console.log(JSON.parse(data));
        socket.write(JSON.stringify({
            type : "test-response",
            data: {msg : "ack"},
            error: false,
        }))
        
    })
    socket.on("close",(err)=>{
        if(err) console.log("Closed due to a transmission error");
        console.log("connection closed");
    })
});

server.listen(process.env.PORT,()=>{
    console.log(`Auth service now listening on port ${process.env.PORT}`);
})


