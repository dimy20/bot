const Docker = require("dockerode");
const docker = new Docker({socketPath : process.env.DOCKER_SOCKET_PATH});
const shortid = require('shortid');
// this returns all the data related to the container creation if sucess
async function createRoom(name){
    try {
            const id = shortid.generate();
            const chat_room = await docker.createContainer({
                HostConfig:{
                    PortBindings : {
                        [`${process.env.ROOM_PORT}/tcp`]: [{
                                "HostPort" : process.env.ROOM_PORT
                        }]
                    }
                },
                Image: process.env.ROOM_IMAGE,
                name : `room_${name}_${id}`
        });

        await chat_room.start({});

    } catch (error) {
            console.log(error);
    }
}
module.exports={
    createRoom
}