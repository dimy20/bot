import {StatusCode,ErrorReason,ErrorType,Defaults} from "../constants/constants"

export interface IERROR {
    type : ErrorType, // change this to predefined values
    statusCode : StatusCode,
    reason: ErrorReason,
    default :Defaults
}
