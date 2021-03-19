const router = require("express").Router();
const { makeError } = require("../internals/ErrorHandlers/errorHandler");
const {createRoom} = require("../internals/Bootstrapping/container")
const {validate_room_name,validate_expiration,validate_max_connections} = require("../internals/ErrorHandlers/validation");
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



// this will change of course
router.get("/",async (req,res)=>{
	res.json({
		ho: "xd",
	});
})

router.get("/:room_id", (req, res) => {
	const id = req.params.room_id;
	res.json({
		id,
	});
});

/*
    This endpoint acts a proxy, tunneling tcp connections to an specific
    existing room.
 
    forwards connection to rooom, allowing clients to connect with the
    room they just created.
    This makes some checks to see if room is still available, and some
    authentication should be provided to indentify thw owner.
    Invite users cant make use of this endpoint to connect with the room.

*/

// to be implemented!
router.get("/connect/:room_id",(req,res)=>{});
/*	

Paramds
-name <name>  : name for the chat room
-max <max_number> : maximum number of connection allowed
-expiration_date <seconds_to_terminate | date x/x/x | usersLeave>
			<usersLeave> => room gets removed when all users leave */

router.post("/room", async (req, res) => {
	//init defaults
	let max_connections = ROOM_DEFAULT_MAX_CONNECTIONS;
	let name = "random";
	let expiration = ROOM_DEFAULT_EXPIRATION_VALUE;

	try {
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


		createRoom(name);


	} catch (error) {
		console.log(error);
		res.status(error.statusCode).json({
			error: error.message,
			reason: error.reason,
			default: error.default,
		});
	}
    
	res.status(200).json({
		name,
		max_connections,
		expiration,
		connection_url: `ws://${process.env.DOMAIN_NAME}`
	});
});

module.exports = router;
