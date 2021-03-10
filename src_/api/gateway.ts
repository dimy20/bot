import express,{Request, Response, NextFunction} from "express";

export const app = express();
const cors = (req : Request, res : Response, next : NextFunction) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Content-Type", "application/json");
	next();
};
function MediaTypeVerify(req : Request, res : Response, next : NextFunction) {
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

app.use(express.json());
app.use(cors);
app.use(MediaTypeVerify);
app.get("/", (req, res) => {
	res.json({
		message: "hello from ts",
	});
});
