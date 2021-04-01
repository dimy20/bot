const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wb3ci.mongodb.net/${process.env.DB_NAME_DEV}?retryWrites=true&w=majority`;
const config = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}

async function init_db(){
    try {

        await mongoose.connect(URI,config);
        console.log("connected to database");
        
    } catch (error) {
        console.log(error);
    }
}

init_db();