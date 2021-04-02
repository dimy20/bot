
const http = require("http");
const app = require("./api/gateway");
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
	console.log(`Server now running on port ${process.env.PORT}`);
});

