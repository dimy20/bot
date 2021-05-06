const uuid = require("uuid");
const router = require("express").Router();
const { makeError } = require("../internals/ErrorHandlers/errorHandler");
const {ipc_create_room,ipc_auth_sign_in} = require("../internals/ipc/room")
const {validate_room_name,validate_expiration,validate_max_connections} = require("../internals/ErrorHandlers/validation");
 
/* 
	Api version 1
*/ 
const {
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
	ROOM_DEFAULT_EXPIRATION_VALUE,
    CODE_BAD_REQUEST,
	ROOM_DEFAULT_NAME,
    REASON_ROOM_EXPIRATION_ERROR,
    REASON_ROOM_NAME_ERROR, 
    REASON_ROOM_MAX_CONNECTIONS_ERROR,
    MESSAGE_ROOM_EXPIRATION_ERROR,
    MESSAGE_ROOM_NAME_ERROR,
    MESSAGE_ROOM_MAX_CONNECTIONS_ERROR,
} = require("../internals/constants/constants");

router.get("/auth", async (req,res)=>{
	try {
		
	const test = await ipc_auth_sign_in("hello from api server");
	console.log(test)
	if(test){
		res.json({
			test
		})
	}
	} catch (error) {
		console.log(error);
	};

})
// this will change of course
router.get("/",async (req,res)=>{
	res.json({
		message : "Callysto welcomes you!"
	})
})
/*
	Responds with webSocket credentials so clients can connect and extra data.	
*/
router.get("/:room_id", (req, res) => {
	const id = req.params.room_id;
	res.json({
		id,
	});
});

// to be implemented!
router.get("/connect/:room_id",(req,res)=>{});
/*	

Paramds
-name <name>  : name for the chat room
-max <max_number> : maximum number of connection allowed
-expiration_date <seconds_to_terminate | date x/x/x | usersLeave>
			<usersLeave> => room gets removed when all users leave */

router.post("/room", async (req, res) => {
	function validate_pwd(pwd) {
	//add logic here
		return true;
		//makeError(args);
	}
	//init defaults
	let max_connections = ROOM_DEFAULT_MAX_CONNECTIONS;
	let name = "random";
	let expiration = ROOM_DEFAULT_EXPIRATION_VALUE;
	let pwd = "";

	try {
		if(Boolean(req.body.pwd) && validate_pwd(req.body.pwd)){
				pwd = req.body.pwd;
		}else{
			//if not pwd is sent, make random one
			pwd = uuid.v1().split("-")[4];
		}
		if (Boolean(req.body.expiration)) {
			if (Boolean(validate_expiration(req.body.expiration))) {
				expiration = req.body.expiration;
			} else {
				throw makeError(CODE_BAD_REQUEST,ROOM_MAX_DURATION,REASON_ROOM_EXPIRATION_ERROR,MESSAGE_ROOM_EXPIRATION_ERROR);
			}
		}

		if (Boolean(req.body.name)) {
				if(validate_room_name(req.body.name)){
					name = req.body.name;
				}
		 	else throw makeError(CODE_BAD_REQUEST,REASON_ROOM_NAME_ERROR,ROOM_DEFAULT_NAME,MESSAGE_ROOM_NAME_ERROR);
		}

		//add support for intergers in string format
		if (Boolean(req.body.max_connections)) {
				if(validate_max_connections(req.body.max_connections))
					max_connections = req.body.max_connections; 
			else throw makeError(CODE_BAD_REQUEST,ROOM_MAX_CONNECTIONS_ALLOWED,REASON_ROOM_MAX_CONNECTIONS_ERROR,MESSAGE_ROOM_MAX_CONNECTIONS_ERROR);
		}
		
		try {
			const data = await ipc_create_room({name,max_connections,expiration,pwd});
			res.status(200).json({
				name : data.name,
				max_connections : data.max_connections,
				expiration : data.expiration,
				connect_url: data.connect,
				pwd: data.pwd
			});
		} catch (error) {
			console.log(error);
		}

		


	} catch (error) {
		res.status(error.statusCode).json({
			error: error.message,
			reason: error.reason,
			default: error.default,
		});
	}
	

	
});

module.exports = router;
