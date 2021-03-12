const http = require("http");
const app = require("./api/gateway");
const server = http.createServer(app);
server.listen(80, () => {
	console.log(`Server now running on port ${process.env.PORT}`);
});

const querystring = require("querystring");
