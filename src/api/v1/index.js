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

/* 	const query_params = querystring.stringify({
		client_id: process.env.CLIENT_ID,
		scope: "bot",
		permissions: 1,
	}); */

module.exports = router;
