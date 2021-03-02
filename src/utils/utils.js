const querystring = require("querystring");
const axios = require("axios");
async function exchange_code(code) {
	const data = {
		client_id: "816071605386084353",
		client_secret: "BFVhRDGDVF4_EO-wS-f_ZDPAjJ5KUc2H",
		grant_type: "authorization_code",
		code: code,
		redirect_uri: "http://localhost/api/v1",
		scope: "identify email connections",
	};
	const config = {
		method: "post",
		url: process.env.API_ENDPOINT + "/oauth2/token",
		data: querystring.stringify(data),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	try {
		return await axios(config);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	exchange_code,
};
