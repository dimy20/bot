const router = require("express").Router();
const uuid = require("uuid");
const {
	ROOM_NAME_MAX_CHARACTERS,
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
} = require("../internals/constants/constants");

console.log(
	NAME_MAX_CHARACTERS,
	ROOM_EXPIRATION_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED
);
router.get("/", async (req, res) => {
	res.send("this is a test");
});
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
			if (15 <= ROOM_MAX_DURATION) {
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
	let expiration = "onUsersLeave";

	if (Boolean(req.body.expiration)) {
		console.log(validate_expiration(req.body.expiration));
		Boolean(validate_expiration(req.body.expiration));
	}
	if (Boolean(name)) {
		if (typeof req.body.name === "string") {
			if (req.body.name.length <= ROOM_NAME_MAX_CHARACTERS) {
				name = req.body.name;
			}
			{
				//error
			}
		}
	}
	{
		//error
	}

	if (Boolean(req.body.max_connections)) {
		if (typeof req.body.max_connections === "number")
			if (req.body.max_connections <= ROOM_DEFAULT_MAX_CONNECTIONS) {
				max_connections = req.body.max_connections;
			}
		{
			//error
		}
	}
	res.status(200).json({
		name,
		max_connections,
	});
});

/* 	const query_params = querystring.stringify({
		client_id: process.env.CLIENT_ID,
		scope: "bot",
		permissions: 1,
	}); */

module.exports = router;
