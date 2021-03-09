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
/*If not body present error too */
function MediaTypeVerify(req, res, next) {
	if (req.method === "POST") {
		const allowed_content_types = [
			"application/json",
			"x-www-form-urlencoded",
		];
		const ContentType = req.headers["content-type"];

		for (let i = 0; i < allowed_content_types.length; i++) {
			if (allowed_content_types[i] === ContentType) next();
		}
		console.log("xd");
		res.status(415).json({
			message: "Invalid Conent-Type",
		});
	}
	next();
}

/* 
    Accepted Content-Type:
        application/json
        application/x-www-form-urlencoded
*/
app.use(express.json());
app.use(cors);
app.use(MediaTypeVerify);
app.use("/api/v1", require("./v1/index"));
module.exports = app;
