const http = require("http");
/*
The Sec-WebSocket-Key is a completely random string 
with a length of 16 bytes, 
and has an allowable range of ASCII value 32 to 127
*/
const CODE_MIN = 65;
const CODE_MAX = 127;
const MAX_BYTE_LENGTH = 16;

function random_range(min,max){
    return Math.floor(Math.random() * (max - min +1) + min );
}
function get_sec_websocket_key(){
    let res = "";
    for(let i = 0;i<MAX_BYTE_LENGTH;i++) {
        const random = random_range(CODE_MIN,CODE_MAX);
        res = res + String.fromCharCode(random);
        }
    return Buffer.from(res).toString("base64");
}
const key = get_sec_websocket_key();
console.log(key);

/*const options = {
    host:"localhost",
    port:80,
    method:"GET",
    path:"/",
    headers: {
        Upgrade: 'websocket',
        "Sec-WebSocket-Key": key,
        "Sec-WebSocket-Protocol": "chat, superchat",
        "Sec-WebSocket-Version":13
    }
}

const req = http.request(options,(res)=>{
    res.on("data",(data)=>{
        console.log(data);
     })
    req.on('error',error=>{console.log(error)});
})

req.end();*/
