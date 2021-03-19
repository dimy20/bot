const ROOM_NAME_MAX_CHARACTERS = 50;
const ROOM_MAX_DURATION = 43800; // minutes in a month
const ROOM_DEFAULT_MAX_CONNECTIONS = 4;
const ROOM_MAX_CONNECTIONS_ALLOWED = 16;
const ROOM_DEFAULT_EXPIRATION_VALUE = "onUsersLeave";
const ROOM_DEFAULT_NAME = "a pseudo-random generated name";
// STATUS CODES
const CODE_BAD_REQUEST = 400;
const CODE_UNAUTHORIZED = 401;
const CODE_FORBIDDEN_RESOURCE = 403;
const CODE_NOT_FOUND = 404;
const CODE_OK = 200;
const CODE_INTERNAL_ERROR = 500; 

// ERROR REASONS
const REASON_ROOM_EXPIRATION_ERROR ="bad expiration value, expiration value must be an integer less than or equal to 43800 or the reserved string";
const REASON_ROOM_NAME_ERROR = "invalid name, value must be a string up to 50 characters and containing only [a-zA-Z0-9][a-zA-Z0-9_.-]";
const REASON_ROOM_MAX_CONNECTIONS_ERROR = "bad max_connections value, max_connections value must be an interger bigger than 1 and less than or equal to 16";
const REASON_ROOM_CREATION_ERROR= "An internal error ocurred while initializing the room chat";

// ERROR NAMES 
const MESSAGE_ROOM_EXPIRATION_ERROR = "invalid expiration value";
const MESSAGE_ROOM_NAME_ERROR="invalid name value"
const MESSAGE_ROOM_MAX_CONNECTIONS_ERROR= "invalid max_connections value";
const MESSAGE_ROOM_CREATION_ERROR = "room initialization error";

module.exports = {
	ROOM_NAME_MAX_CHARACTERS,
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
	ROOM_DEFAULT_EXPIRATION_VALUE,
    ROOM_DEFAULT_NAME,
    CODE_BAD_REQUEST,
    CODE_UNAUTHORIZED,
    CODE_FORBIDDEN_RESOURCE, 
    CODE_NOT_FOUND,
    CODE_OK,
    CODE_INTERNAL_ERROR,
    REASON_ROOM_EXPIRATION_ERROR,
    REASON_ROOM_NAME_ERROR, 
    REASON_ROOM_MAX_CONNECTIONS_ERROR,
    REASON_ROOM_CREATION_ERROR,
    MESSAGE_ROOM_EXPIRATION_ERROR,
    MESSAGE_ROOM_NAME_ERROR,
    MESSAGE_ROOM_CREATION_ERROR,
    MESSAGE_ROOM_MAX_CONNECTIONS_ERROR,
};



