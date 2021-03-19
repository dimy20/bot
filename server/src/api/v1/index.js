const router = require("express").Router();
const { makeError } = require("../internals/ErrorHandlers/errorHandler");
const {createRoom} = require("../internals/Bootstrapping/container")
const {
	ROOM_NAME_MAX_CHARACTERS,
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
	ROOM_DEFAULT_EXPIRATION_VALUE,
    CODE_BAD_REQUEST,
	CODE_INTERNAL_ERROR,
    REASON_ROOM_EXPIRATION_ERROR,
    REASON_ROOM_NAME_ERROR, 
    REASON_ROOM_MAX_CONNECTIONS_ERROR,
    MESSAGE_ROOM_EXPIRATION_ERROR,
    MESSAGE_ROOM_NAME_ERROR,
    MESSAGE_ROOM_MAX_CONNECTIONS_ERROR,
	MESSAGE_ROOM_CREATION_ERROR,
	REASON_ROOM_CREATION_ERROR
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
function validate_expiration(exp) {
	if (typeof exp === "number" && exp <= ROOM_MAX_DURATION) return exp;

	if (typeof exp === "string") {
		if (typeof parseInt(exp) === "number") {
			if (parseInt(exp) <= ROOM_MAX_DURATION) {
				return parseInt(exp);
			}
		}
		if (exp === "onUsersLeave") return exp;
	}
	return false;
}
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
	console.log("hits endpoint");
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
			if (
				typeof req.body.name === "string" &&
				req.body.name.length <= ROOM_NAME_MAX_CHARACTERS
			) {
				name = req.body.name;
			}
		 	else throw makeError(CODE_BAD_REQUEST,ROOM_NAME_MAX_CHARACTERS,REASON_ROOM_NAME_ERROR,MESSAGE_ROOM_NAME_ERROR);
		}
			

		//add support for intergers in string format
		if (Boolean(req.body.max_connections)) {
			let max_conn_placeholder = typeof req.body.max_connections === 'string' ? parseInt(req.body.max_connections) : req.body.max_connections;
			if (
				typeof max_conn_placeholder === "number" &&
				max_conn_placeholder <= ROOM_MAX_CONNECTIONS_ALLOWED
			)
				max_connections = max_conn_placeholder; 
			else throw makeError(CODE_BAD_REQUEST,ROOM_MAX_CONNECTIONS_ALLOWED,REASON_ROOM_MAX_CONNECTIONS_ERROR,MESSAGE_ROOM_MAX_CONNECTIONS_ERROR);
		}

			createRoom(name);


	} catch (error) {
		res.status(error.statusCode).json({
			error: error.message,
			reason: error.reason,
			default: error.default,
		});
	}
    


/* 		res.status(CODE_INTERNAL_ERROR).json({
			name : MESSAGE_ROOM_CREATION_ERROR,
			reason: REASON_ROOM_CREATION_ERROR,
		}) */
	res.status(200).json({
		name,
		max_connections,
		expiration,
		connection_url: `ws://${process.env.DOMAIN_NAME}`
	});
});

module.exports = router;
