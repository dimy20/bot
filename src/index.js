const express = require("express");
const app = express();
const redirect_uri = "http://localhost/api/v1";

const discord_auth_url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=816071605386084353&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=${redirect_uri}&prompt=consent`;

app.get("/", (req, res) => {
	res.redirect(discord_auth_url);
});

app.use("/api/v1", require("./api/v1"));

app.get("http://localhost/ap1/v1/done", (req, res) => {
	res.json({ message: "we are done!" });
});
app.listen(process.env.PORT, () => {
	console.log(`App now listening on port ${process.env.PORT}`);
});
