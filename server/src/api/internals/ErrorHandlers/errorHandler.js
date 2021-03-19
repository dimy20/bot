function makeError(statusCode,reason,default,message) {
	const error = new Error(message);
	error.statusCode = statusCode;
	error.default = default;
    error.reason = reason;
	return error;
}
module.exports = {
	makeError,
};
