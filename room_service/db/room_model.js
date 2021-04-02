const mongoose = require("mongoose");
const room_schema = new mongoose.Schema({
    host: String,
    name : String,
    connect: String,
    pwd :String,
    expires: Number,
    availabe:String,
})

const room_model = mongoose.model("room",room_schema,"room");
module.exports = {
   room_model 
}