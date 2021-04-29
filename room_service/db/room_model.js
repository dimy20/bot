const mongoose = require("mongoose");
const room_schema = new mongoose.Schema({
    name : String,
    max_connections : Number,
    connect: String,
    pwd :String,
    expires: String, // onUserLeave or a string number representing hours to expire
    availabe:String,
})

const room_model = mongoose.model("room",room_schema,"room");
module.exports = {
   room_model 
}