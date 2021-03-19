// Reponse errors
function makeError(statusCode,reason,defaults,message) {
	const error = new Error(message);
	error.statusCode = statusCode;
	error.default = defaults;
    error.reason = reason;
	return error;
}
module.exports = {
	makeError,
};
