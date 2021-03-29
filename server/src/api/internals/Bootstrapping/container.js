const shortid = require('shortid');
// this returns all the data related to the container creation if sucess
async function createRoom(name){
    try {
        // logic here
            const id = shortid.generate();

    } catch (error) {
            console.log(error);
    }
}
module.exports={
    createRoom
}