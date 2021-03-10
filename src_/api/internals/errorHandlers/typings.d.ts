import {StatusCode, Defaults} from "../constants/constants"
declare global {
    interface Error {
            statusCode : StatusCode,
            default: Defaults
        }
}
