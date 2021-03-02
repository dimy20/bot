const express = require("express");
const app = express();
const axios = require("axios");

const redirect_uri = "http://localhost/api/v1";

const discord_auth_url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=816071605386084353&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=${redirect_uri}&prompt=consent`;

app.get("/", (req, res) => {
	res.redirect(discord_auth_url);
});

app.get("/api/v1", async (req, res) => {
	const code = req.query.code;
	const state = req.query.state;
	const API_ENDPOINT = "https://discord.com/api/v8";

	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: "authorization code",
		code: code,
		redirect_uri: "http://localhost/ap1/v1/done",
		scope: "identify email connections",
	};
	const config = {
		method: "POST",
		url: API_ENDPOINT,
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	const response = await axios.post(config);
	console.log(response);
	res.json({ message: "you are now authorized!" });
});

app.get("http://localhost/ap1/v1/done", (req, res) => {
	res.json({ message: "we are done!" });
});
app.listen(process.env.PORT, () => {
	console.log(`App now listening on port ${process.env.PORT}`);
});
