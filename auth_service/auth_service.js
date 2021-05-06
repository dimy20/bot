require("./db/index");
const {user_sign_up}= require("./db/utils");
const {user_model} = require("./db/user_model");
const net = require("net");
const server = net.createServer();

const enum_ipc_auth = {
    sign_up: 1,
    log_in : 2,
}
class Response{
    constructor(success,data,error){
        this.success = success;
        if(!this.success){
            this.error = error;
        }else{
            this.data = data;
            this.error = false;
        }
    }
}
server.on("connection",(socket)=>{
    socket.on("connect",(data)=>{
        console.log(data);
    })
    socket.on("data",async (chunk)=>{
        const stream_data  = JSON.parse(chunk.toString());
        if(stream_data.type === enum_ipc_auth.sign_up){
            try {
                const test = await user_sign_up("xd");
                console.log(test);
                socket.write(JSON.stringify({
                    type : "test-response",
                    data: {msg : "ack"},
                    error: false,
                }))
            } catch (err) {
                //grab error object keys
                socket.write(JSON.stringify(new Response(false,null,err)))

            }
        }


        

    })
    socket.on("close",(err)=>{
        if(err) console.log("Closed due to a transmission error");
        console.log("connection closed");
    })
});

server.listen(process.env.PORT,()=>{
    console.log(`Auth service now listening on port ${process.env.PORT}`);
})


