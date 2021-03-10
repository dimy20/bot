import http from "http";
import { app } from "./test";
console.log("what the fuck is this");
const server = http.createServer(app);
server.listen(80, () => {
	console.log("sever workin");
});
