const router = require("express").Router();
const { exchange_code } = require("../../utils/utils");
router.get("/", async (req, res) => {
	const code = req.query.code;
	const { data } = await exchange_code(code);
	console.log(data);
	res.json(data);
});

module.exports = router;
