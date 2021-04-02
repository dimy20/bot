const mongoose = require("mongoose");
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_DEV= process.env.DB_DEV;
const DB_PROD= process.env.DB_PROD;

const config = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}
/**
 * inits mongoose database 
*/
async function init_db(user,pass,db){
const uri = `mongodb+srv://${user}:${pass}@cluster0.wb3ci.mongodb.net/${db}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri,config);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
}

init_db(DB_USER,DB_PASS,DB_DEV);