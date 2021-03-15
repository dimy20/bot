const http = require("http");
const crypto = require("crypto");
const guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const server = http.createServer((req,res)=>{
const req_path = req.url;
    handshake(req.headers);
    if(req_path === "/"){
            res.write("helllo");
            res.end();
    }
})
function handshake(headers){
    const sec_websocket_key = headers['sec-websocket-key'];
    console.log(sec_websocket_key);
    
}
server.listen(80);
