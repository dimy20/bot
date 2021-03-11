import express,{Request,Response,Router} from "express";
import axios from "axios";
import {errorHandler} from "../internals/errorHandlers/typings"
import {Defaults,ErrorType,StatusCode,ErrorReason} from "../internals/constants/constants";

const router : Router = express.Router();
router.get("/", async (req:Request, res:Response) => {
	const answer = await axios.get("http://localhost:8080/test");
	console.log(answer.data);
	res.json({
		ho: "xd",
	});
});
router.get("/:room_id", (req:Request, res:Response) => {
	const id = req.params.room_id;
	res.json({
		id,
	});
});

function validate_expiration(exp : string | number) : boolean {
	if (typeof exp === "number" && exp <= Defaults.ROOM_MAX_DURATION) return true;

	if (typeof exp === "string") {
		if (typeof parseInt(exp) === "number") {
			if (parseInt(exp) <= Defaults.ROOM_MAX_DURATION) {
                return true
			}
		}
		if (exp === "onUsersLeave") return true;
	}
	return false;
}

router.post("/room", (req, res) => {
	//init defaults
	let max_connections = Defaults.ROOM_DEFAULT_MAX_CONNECTIONS;
	let name = "random";
	let expiration = Defaults.ROOM_DEFAULT_EXPIRATION_VALUE;
	try {
		if (Boolean(req.body.expiration)) {
			if ((validate_expiration(req.body.expiration))) {
				expiration = req.body.expiration;
			} else {
				throw errorHandler.makeError(ErrorType.ROOM_EXPIRATION_ERROR,StatusCode.CODE_BAD_REQUEST,ErrorReason.ROOM_EXPIRATION_ERROR,Defaults.ROOM_DEFAULT_EXPIRATION_VALUE);
			}
		}

		if (Boolean(name)) {
			if (
				typeof req.body.name === "string" &&
				req.body.name.length <= Defaults.ROOM_NAME_MAX_CHARACTERS
			) {
				name = req.body.name;
			}
		} else throw errorHandler.makeError(ErrorType.ROOM_NAME_ERROR,StatusCode.CODE_BAD_REQUEST,ErrorReason.ROOM_NAME_ERROR,Defaults.ROOM_NAME_MAX_CHARACTERS,);

		//add support for intergers in string format
		if (Boolean(req.body.max_connections)) {
			if (
				typeof req.body.max_connections === "number" &&
				req.body.max_connections <= Defaults.ROOM_MAX_CONNECTIONS_ALLOWED
			)
				max_connections = req.body.max_connections;
			else throw errorHandler.makeError(ErrorType.ROOM_MAX_CONNECTIONS_ERROR,StatusCode.CODE_BAD_REQUEST,ErrorReason.ROOM_MAX_CONNECTIONS_ERROR,Defaults.ROOM_MAX_CONNECTIONS_ALLOWED);
		}
	} catch (error) {
		res.status(error.statusCode).json({
			error: true,
			reason: error.message,
			default: error.default,
		});
		console.log(error);
	}

	res.status(200).json({
		name,
		max_connections,
		expiration,
	});
});