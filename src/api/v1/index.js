const router = require("express").Router();
const querystring = require("querystring");

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
router.post("/room", (req, res) => {});
/* 	const query_params = querystring.stringify({
		client_id: process.env.CLIENT_ID,
		scope: "bot",
		permissions: 1,
	}); */

module.exports = router;
