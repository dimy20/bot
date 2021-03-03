const router = require("express").Router();
const querystring = require("querystring");
const {
	bot_access,
	exchange_code,
	refresh_token,
	isRequestSignatureValid,
} = require("../../utils/utils");

router.get("/", async (req, res) => {
	const code = req.query.code;
	const data = await exchange_code(code);
});

router.get("/bot", async (req, res) => {
	const base_url = "https://discord.com/api/oauth2/authorize?";
	const query_params = querystring.stringify({
		client_id: process.env.CLIENT_ID,
		scope: "bot",
		permissions: 1,
	});
	res.redirect(base_url + query_params);
});

router.get("/webhook", (req, res) => {
	const signature = req.get("X-Signature-Ed25519");
	const timestamp = req.get("X-Signature-Timestamp");
	const body = req.rawBody; // rawBody is expected
	const isVerified = isRequestSignatureValid(signature, timestamp, body);
	if (!isVerified) {
		return res.status(401).end("invalid request signature");
	}
});
module.exports = router;
