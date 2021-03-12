function makeError(ERROR_DEFINITION) {
	const error = new Error(ERROR_DEFINITION.reason);
	error.statusCode = ERROR_DEFINITION.statusCode;
	error.default = ERROR_DEFINITION.default;
	return error;
}
module.exports = {
	makeError,
};
