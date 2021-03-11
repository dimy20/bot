import {IERROR} from "./errorDefinitions"
import { errorHandler} from "./typings"

errorHandler.makeError = function(errorDefinition : IERROR) : Error{
	const error = new Error(errorDefinition.reason);
	error.statusCode = 12;
	error.defaultsTo= errorDefinition.default;
	return error;
}
 

