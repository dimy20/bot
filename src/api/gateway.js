const express = require("express");
const app = express();
/* 
    Gateways manages api versions and middlewares
*/
app.use("/api/v1", require("./v1/index"));
module.exports = app;
