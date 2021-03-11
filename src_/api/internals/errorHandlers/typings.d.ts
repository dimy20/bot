import {StatusCode, Defaults, ErrorReason} from "../constants/constants"
declare global {
    interface Error {
            statusCode : StatusCode,
            defaultsTo: Defaults
        }
}
 

export declare namespace errorHandler{

    interface IERROR {
            type : ErrorType, // change this to predefined values
            statusCode : StatusCode,
            reason: ErrorReason,
            default :Defaults
        }

    declare function makeError(type: ErrorType, statusCode : StatusCode, reason : ErrorReason, defaultsTo: Defaults) : Error;
        
}

//export declare function makeError(errorDefinition : IERROR) : Error;