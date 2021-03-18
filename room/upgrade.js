const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req,res)=>{
})

server.on("upgrade",(req,socket)=>{
    if (req.headers['upgrade'] !== 'websocket') {
    socket.end('HTTP/1.1 400 Bad Request');
    return;
    }
    const res_headers = handshake(req.headers);
    console.log(res_headers);
    socket.write(res_headers);

    socket.on("data",(buffer)=>{
         parseIncomingFrame(buffer);
    })    

})
/* What we receive here a raw tcp sockets, the WebSocket scheme is built on top of a raw tcp connection
   so the buffers we receive here are not linked to the actual webSocket frames, this means that it is 
   expected that a single buffer might not be alligned with the bytes that make up a given webSocket frame.
   So as our parsing logic we will need to keep track of where one frame ends and the next one begins.
*/


function handshake(headers){
    // RFC6455 guid value
    const guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"; 
    const sec_websocket_key = headers['sec-websocket-key'];
    // subprotocols the client supports
    const ws_protocols = headers['sec-websocket-protocol'].split(",");  
    let sub_protocol = ws_protocols.join(", ");
    // if chat is present as supported subprotocol by the client use it
/*
    for(let p of ws_protocols)
        if('json' === p) sub_protocol = p;*/
    // concats incoming sec-websocket-key header key to guid specified on RFC6455
    const concat_key_guid = sec_websocket_key + guid;
    const accept = crypto.createHash("SHA1").update(concat_key_guid).digest('base64');
    const response_headers = ['HTTP/1.1 101 Web Socket Protocol Handshake','Connection: Upgrade','Upgrade: WebSocket',`Sec-WebSocket-Accept: ${accept}`,`Sec-WebSocket-Protocol: ${sub_protocol}`];
    return response_headers.join("\r\n") + "\r\n\r\n";
}

/* 
    -> Server receives masked data frames from the client.
    -> The server MUST close the connection upon receiving a
       frame that is not masked
       In this case, a server MAY send a Close
       frame with a status code of 1002 (protocol error)
    -> A server MUST NOT mask any frames that it sends to
       the client. 

     -> The base framing protocol defines a frame type with an opcode, a
        payload length, and designated locations for "Extension data" and
        "Application data", which together define the "Payload data".

    ->   A data frame MAY be transmitted by either the client or the server at
        any time after opening handshake completion and before that endpoint
        has sent a Close frame 
*/

function parseIncomingFrame(buffer){
    console.log(buffer.toString("utf-8"));
    /*
        The first byte is broke down into 3 sections of bits.
        -> The final bit representing the final frame. 
        -> the next 3 bits for the reserved flags 
        -> The remaining 4 bits for the operation code, (opcode)
        opcode defines how we should handle the payload data, if an unknown opcode is sent to 
        the server, the connection must fail.
        OPCODES TABLE
        
        opcode interpretation
        ------|----------- 
        %x0  : continuation frame
        %x1  :  text frame
        %x2  : binary frame
        %x3–7 : reserved for further non-control frames
        %x8  : connection close
        %x9  : ping
        %xA  : pong
        %xB-F : reserved for further control frames
    */
    const firstByte = buffer.readUInt8(0); //  ---- ----

    const isFinalFrame = Boolean((firstByte >>> 7) && 0x1);
    //check reserved flags
    //0 0 0 0 x x x 0
    const flag1=  Boolean((firstByte >>> 6 ) && 0x1);
    const flag2=  Boolean((firstByte >>> 5) && 0x1);
    const flag3=  Boolean((firstByte >>> 4) && 0x1);

    // x x x x 0 0 0 0
    // we need to check the last 4 remaining bits whick are reserved for the op code,
    const opcode = firstByte & 0xf;

    // 0x8 denotes a connection close opcode 
    if(opcode === 0x8) return null;
    // we are only handling text files for now
    if(opcode!= 0x1) return;
    
    const secondByte = buffer.readUInt8(1);
    const is_masked = Boolean((secondByte >>> 7) & 0x1);
    


   /* payload lengtth : 
        0-125 is present those bits represent the payload length
        if bits are the value 126 : the next 16 bits are used to store the payload length
        if bits are the value 127 : an 8 byte payload length is used to store the length (very big)

    */
    let offset = 2;
    const payload_length = secondByte & 0x7f;

    if(payload_length === 126){
        payload_length = buffer.readUInt16BE(offset);
        offset+=2;
    }

    // very big frame!
    if(payload_length === 127){
        const first_4_bytes = buffer.readUInt16BE(offset);
        offset +=4;
        const second_4_bytes = buffer.readUInt16BE(offset);

    }
    if(!is_masked) return null;

        const mask_key  = buffer.readUInt32BE(offset);
        offset+=4;

    
    for(let i =0, j = 0; i< payload_length ; i++, j = i % 4){
        const shift = (j == 3 ? 0 : (3 -j)  << 3);
        const mask = (shift === 0 ? mask_key : (mask_key >>> shift)) & 0xff;
        const source = buffer.readUInt8(offset++);
        const xored =  mask ^ source;
        buffer.writeUInt8(xored,i);
}
        const payload= buffer.toString("utf-8");
        const json = JSON.parse(payload);
        console.log(json);



}
    
server.listen(80);
