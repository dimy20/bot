
// all default values and limits
export enum Defaults{
ROOM_NAME_MAX_CHARACTERS = 50,
ROOM_MAX_DURATION = 43800, // minutes in a month
ROOM_DEFAULT_MAX_CONNECTIONS = 4,
ROOM_MAX_CONNECTIONS_ALLOWED = 16,
ROOM_DEFAULT_EXPIRATION_VALUE = "onUsersLeave",
}
//status codes
export enum StatusCode {
	CODE_BAD_REQUEST = 400,
	CODE_UNAUTHORIZED = 401,
	CODE_FORBIDDEN_RESOURCE = 403,
	CODE_NOT_FOUND = 404,
	CODE_OK = 200,
}


export enum ErrorReason {
	ROOM_EXPIRATION_ERROR = 
		"bad expiration value, expiration value must be an integer less than or equal to 43800 or the reserved string",
	ROOM_NAME_ERROR = 
		"bad name value, name value must a string with less than or equal to 50 characters",
    ROOM_MAX_CONNECTIONS_ERROR = 
        "bad max_connections value, max_connections value must be an interger bigger than 1 and less than or equal to 16",
}
export enum ErrorType{
	ROOM_EXPIRATION_ERROR,
	ROOM_NAME_ERROR,
    ROOM_MAX_CONNECTIONS_ERROR 
}