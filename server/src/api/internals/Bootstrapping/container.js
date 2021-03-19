const Docker = require("dockerode");
const docker = new Docker({socketPath : process.env.DOCKER_SOCKET_PATH});

const uuid = require("uuid");
async function createRoom(name){
    
    const container_port = process.env.ROOM_PORT + "/tcp";
    try {
            const chat_room = await docker.createContainer({
                HostConfig:{
                    PortBindings : {
                        "1337/tcp": [{
                                "HostPort" : process.env.ROOM_PORT
                        }]
                    }
                },
                Image: process.env.ROOM_IMAGE,
                name : `room_${name}`
        });

        await chat_room.start({});

    } catch (error) {
            console.log(error);
    }
}
module.exports={
    createRoom
}