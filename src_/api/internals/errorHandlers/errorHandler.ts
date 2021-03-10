import {IERROR} from "./errorDefinitions"

function makeError(errorDefinition : IERROR) {
	const error = new Error(errorDefinition.reason);
	error.statusCode = 12;
	error.default = errorDefinition.default;
	return error;
}

module.exports = {
	makeError,
}