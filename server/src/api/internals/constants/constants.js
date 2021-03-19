const ROOM_NAME_MAX_CHARACTERS = 50;
const ROOM_MAX_DURATION = 43800; // minutes in a month
const ROOM_DEFAULT_MAX_CONNECTIONS = 4;
const ROOM_MAX_CONNECTIONS_ALLOWED = 16;
const ROOM_DEFAULT_EXPIRATION_VALUE = "onUsersLeave";

// STATUS CODES
const CODE_BAD_REQUEST = 400;
const CODE_UNAUTHORIZED = 401;
const CODE_FORBIDDEN_RESOURCE = 403;
const CODE_NOT_FOUND = 404;
const CODE_OK = 200;

// ERROR REASONS
const REASON_ROOM_EXPIRATION_ERROR ="bad expiration value, expiration value must be an integer less than or equal to 43800 or the reserved string";
const REASON_ROOM_NAME_ERROR = "bad name value, name value must a string with less than or equal to 50 characters",
const REASON_ROOM_MAX_CONNECTIONS_ERROR = "bad max_connections value, max_connections value must be an interger bigger than 1 and less than or equal to 16";

// Error names
const MESSAGE_ROOM_EXPIRATION_ERROR = "room expiration error";
const MESSAGE_ROOM_NAME_ERROR="room name error"
const MESSAGE_ROOM_MAX_CONNECTIONS_ERROR= "room max connections error";

module.exports = {
	ROOM_NAME_MAX_CHARACTERS,
	ROOM_MAX_DURATION,
	ROOM_DEFAULT_MAX_CONNECTIONS,
	ROOM_MAX_CONNECTIONS_ALLOWED,
	ROOM_DEFAULT_EXPIRATION_VALUE,
    CODE_BAD_REQUEST 
    CODE_UNAUTHORIZED,
    CODE_FORBIDDEN_RESOURCE, 
    CODE_NOT_FOUND,
    CODE_OK,
    REASON_ROOM_EXPIRATION_ERROR,
    REASON_ROOM_NAME_ERROR, 
    REASON_ROOM_MAX_CONNECTIONS_ERROR,
    MESSAGE_ROOM_EXPIRATION_ERROR,
    MESSAGE_ROOM_NAME_ERROR,
    MESSAGE_ROOM_MAX_CONNECTIONS_ERROR,
};



