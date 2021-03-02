const router = require("express").Router();
const { exchange_code, refresh_token } = require("../../utils/utils");
router.get("/", async (req, res) => {
	const code = req.query.code;
	const data = await exchange_code(code);
});

module.exports = router;
