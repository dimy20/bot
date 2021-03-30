const {ROOM_NAME_MAX_CHARACTERS,ROOM_MAX_DURATION,ROOM_DEFAULT_EXPIRATION_VALUE,ROOM_MAX_CONNECTIONS_ALLOWED} = require("../constants/constants");

const name_reg= new RegExp("[a-zA-Z0-9][a-zA-Z0-9_.-]");
function validate_room_name(name){
        console.log(name_reg.test(name));
        if(typeof name != "string") return false;
            if(name_reg.test(name)){
                if(name.length<= ROOM_NAME_MAX_CHARACTERS) return true;
                else return false;
            } return false;
}

function validate_expiration(exp) {
	if (typeof exp === "number" && exp <= ROOM_MAX_DURATION) return exp;
	if (typeof exp === "string") {
		if (typeof parseInt(exp) === "number") {
			if (parseInt(exp) <= ROOM_MAX_DURATION) {
				return parseInt(exp);
			}
		}
		if (exp === ROOM_DEFAULT_EXPIRATION_VALUE)return exp;
	}
	return false;
}
function validate_max_connections(max_connections){
			let max_conn_placeholder = typeof max_connections === 'string' ? parseInt(max_connections) : max_connections;
			if (
				typeof max_conn_placeholder === "number" &&
				max_conn_placeholder <= ROOM_MAX_CONNECTIONS_ALLOWED
			) return true;
            else return false; 
}
module.exports ={
    validate_room_name,
    validate_expiration,
    validate_max_connections
}


