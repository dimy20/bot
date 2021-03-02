const querystring = require("querystring");
const axios = require("axios");

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};
async function exchange_code(code) {
	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: "authorization_code",
		code: code,
		redirect_uri: "http://localhost/api/v1",
		scope: "identify email connections",
	};
	const config = {
		method: "post",
		url: process.env.API_ENDPOINT + "/oauth2/token",
		data: querystring.stringify(data),
		headers: headers,
	};
	try {
		const res = await axios(config);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
async function refresh_token(refresh_token, scope) {
	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: "refresh_token",
		refresh_token: refresh_token,
		redirect_uri: "http://localhost/api/v1",
		scope: scope,
	};

	const config = {
		method: "post",
		url: process.env.API_ENDPOINT + "/oauth2/token",
		data: querystring.stringify(data),
		headers: headers,
	};
	try {
		const res = await axios(config);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
module.exports = {
	exchange_code,
	refresh_token,
};
