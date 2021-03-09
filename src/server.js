const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer((req, res) => {
	res.send("hello motherfucker");
});
server.listen(1337);
