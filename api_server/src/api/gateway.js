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
			if (allowed_content_types[i] === ContentType) {
				next();
				return;
			}
		}
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
app.use(MediaTypeVerify);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded());



app.use("/api/v1", require("./v1/index"));
app.use((err,req,res,next)=>{
	//handles json syntax issues
	if(err instanceof SyntaxError && err.status === 400 && "body" in err){
		return res.status(400).json({
			error : "invalid json syntax",
		})
	}
	next();
})
module.exports = app;
