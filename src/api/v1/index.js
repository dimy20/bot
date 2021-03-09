const router = require("express").Router();
const {
	DEFAULT_MAX_CONNECTIONS,
	LIMIT_MAX_CONNECTIONS,
	LIMIT_MAX_CHARACTERS,
} = require("../internals/constants/constants");
const uuid = require("uuid");

router.get("/", async (req, res) => {
	res.send("this is a test");
});
router.get("/:room_id", (req, res) => {
	const id = req.params.room_id;
	res.json({
		id,
	});
});

/*	

Paramds
-name <name>  : name for the chat room
-max <max_number> : maximum number of connection allowed
-expiration_date <seconds_to_terminate | date x/x/x | usersLeave>
			<usersLeave> => room gets removed when all users leave */
router.post("/room", (req, res) => {
	//defaults
	let max_connections = DEFAULT_MAX_CONNECTIONS;
	let name = "random";
	let date = new Date();

	/* 	if (Boolean(expiration)) {
		//if(validate data)
	} */
	if (Boolean(name)) {
		if (typeof req.body.name === "string") {
			console.log(req.body.name.length);
			name = req.body.name;
		}
	}

	if (Boolean(req.body.max_connections)) {
		if (typeof req.body.max_connections === "number")
			if (req.body.max_connections <= LIMIT_MAX_CONNECTIONS) {
				max_connections = req.body.max_connections;
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
