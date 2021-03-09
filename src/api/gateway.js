const express = require("express");
const app = express();
/* 
    Gateways manages api versions and middlewares
*/
const cors = (req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Content-Type", "application/json");
	next();
};
app.use(express.json());
app.use(cors);
app.use("/api/v1", require("./v1/index"));
module.exports = app;
