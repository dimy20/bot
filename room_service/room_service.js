const net = require("net");
const server = net.createServer({});
server.on("connection",(socket)=>{
    const chunks = [];
    socket.on("data",(chunk)=>{
        console.log(chunk);
        const data = JSON.parse(Buffer.from(chunk).toString());
        console.log(data);
    })
    socket.on('end',()=>{console.log("connection closed")});
});

server.on("error",(error)=>{console.log(error)});
server.listen(5000);