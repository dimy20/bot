const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req,res)=>{
const req_path = req.url;
    const res_headers = handshake(req.headers);
    if(req_path === "/"){
            // Switching Protocols
            const statusCode = 101;
            res.writeHead(101,res_headers);
            //res.write("this is a test");
            res.end();
    }
})
function handshake(headers){
    // RFC6455 guid value
    const guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"; 
    const sec_websocket_key = headers['sec-websocket-key'];
    // subprotocols the client supports
    const ws_protocols = headers['sec-websocket-protocol'].split(",");  
    let chat = "";
    // if chat is present as supported subprotocol by the client use it
    for(let p of ws_protocols)
        if('chat' === p) chat = p;
    // concats incoming sec-websocket-key header key to guid specified on RFC6455
    const concat_key_guid = sec_websocket_key + guid;
    const sec_websocket_accept = crypto.createHash("SHA1").update(concat_key_guid).digest('base64');
    const res_headers = {
        Upgrade: 'websocket',
        Connection: 'Upgrade',
        'Sec-WebSocket-Accept':sec_websocket_accept,
        'Sec-WebSocket-Protocol': chat // subprotocol to be used
    }
    return res_headers;
}
    
server.listen(80);
