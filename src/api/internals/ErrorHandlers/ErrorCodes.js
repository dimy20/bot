const {
	CODE_BAD_REQUEST,
	CODE_UNAUTHORIZED,
	CODE_FORBIDDEN_RESOURCE,
	CODE_NOT_FOUND,
} = require("../constants/statusCodes");
const ROOM_EXPIRATION_ERROR = {
	status: CODE_BAD_REQUEST,
	reason:
		"bad expiration value, expiration value must be an integer less than or equal to 43800 or the reserved string",
	default: "onUserLeave",
};

const ROOM_NAME_ERROR = {
	status: CODE_BAD_REQUEST,
	reason:
		"bad name value, name value must a string with less than or equal to 50 characters",
	default: "random placeholder name is generated if none is given",
};
const ROOM_MAX_CONNECTIONS_ERROR = {
	status: CODE_BAD_REQUEST,
	reason:
		"bad max_connections value, max_connections value must be an interger bigger than 1 and less than or equal to 16",
	default: 4,
};

module.exports = {
	ROOM_EXPIRATION_ERROR,
	ROOM_NAME_ERROR,
	ROOM_MAX_CONNECTIONS_ERROR,
};
