const Docker = require("dockerode");
const ROOM_IMAGE = "room:latest";
const docker = new Docker({socketPath : process.env.DOCKER_SOCKET_PATH});

async function createRoom(name){
    try {
            const chat_room = await docker.createContainer({
                HostConfig:{
                    PortBindings : {
                        "1337/tcp": [{
                                "HostPort" : "1337"
                        }]
                    }
                },
                Image: ROOM_IMAGE ,
                name : `room${name}`
        });
        const instance = await chat_room.start({});
    } catch (error) {
            console.log(error);
    }
}
module.exports={
    createRoom
}