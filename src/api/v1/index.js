const router = require("express").Router();
const axios = require("axios");
const uuid = require("uuid");
const http = require("http");

const { makeError } = require("../internals/ErrorHandlers/errorHandler");
const {
	ROOM_NAME_MAX_CHARACTERS,
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
	ROOM_DEFAULT_EXPIRATION_VALUE,
} = require("../internals/constants/constants");

const {
	ROOM_EXPIRATION_ERROR,
	ROOM_NAME_ERROR,
	ROOM_MAX_CONNECTIONS_ERROR,
} = require("../internals/ErrorHandlers/ErrorDefinitions");


router.get("/",(req,res)=>{

	const request  = http.request({
		socketPath : "/var/run/docker.sock",
		path : "/v1.41/containers/json",
		method : "GET"
	},(incomingMessage)=>{
		let raw_data;
		incomingMessage.setEncoding("utf-8");
		incomingMessage.on("data",(chunk)=>{
			raw_data += chunk;
		})
		incomingMessage.on("end",()=>{
	 		 const parsed_data = JSON.parse(raw_data);
			 console.log(parsed_data);
		})
	})
	request.on("error",()=>{
		console.log(error);
	})
	request.end();




	res.json({
		ho: "xd",
	});
})

router.get("/:room_id", (req, res) => {
	const id = req.params.room_id;
	res.json({
		id,
	});
});
function validate_expiration(exp) {
	if (typeof exp === "number" && exp <= ROOM_MAX_DURATION) return exp;

	if (typeof exp === "string") {
		if (typeof parseInt(exp) === "number") {
			if (parseInt(exp) <= ROOM_MAX_DURATION) {
				return parseInt(exp);
			}
		}
		if (exp === "onUsersLeave") return exp;
	}
	return false;
}
/*	

Paramds
-name <name>  : name for the chat room
-max <max_number> : maximum number of connection allowed
-expiration_date <seconds_to_terminate | date x/x/x | usersLeave>
			<usersLeave> => room gets removed when all users leave */
router.post("/room", (req, res) => {
	//init defaults
	let max_connections = ROOM_DEFAULT_MAX_CONNECTIONS;
	let name = "random";
	let expiration = ROOM_DEFAULT_EXPIRATION_VALUE;

	try {
		if (Boolean(req.body.expiration)) {
			if (Boolean(validate_expiration(req.body.expiration))) {
				expiration = req.body.expiration;
			} else {
				throw makeError(ROOM_EXPIRATION_ERROR);
			}
		}

		if (Boolean(name)) {
			if (
				typeof req.body.name === "string" &&
				req.body.name.length <= ROOM_NAME_MAX_CHARACTERS
			) {
				name = req.body.name;
			}
		} else throw makeError(ROOM_NAME_ERROR);

		//add support for intergers in string format
		if (Boolean(req.body.max_connections)) {
			if (
				typeof req.body.max_connections === "number" &&
				req.body.max_connections <= ROOM_MAX_CONNECTIONS_ALLOWED
			)
				max_connections = req.body.max_connections;
			else throw makeError(ROOM_MAX_CONNECTIONS_ERROR);
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

/* 	const query_params = querystring.stringify({
		client_id: process.env.CLIENT_ID,
		scope: "bot",
		permissions: 1,
	}); */

module.exports = router;
