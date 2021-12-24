import { verifyToken, getToken } from "../helpers/auth-helper.js";
import { errorResponse } from "../helpers/response-helper.js";
import { statusCodes } from "../config/status-code.js";
import messages from "../messages/response-messages.js";

export const auth = (req, res, next) => {
    try {
        const token = getToken(req);

        if (token === null) { 
            return res.sendStatus(401);
        }

        let userDetails = verifyToken(token);

        if(!userDetails) {
            return errorResponse(res, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS);
        }

        next();
        
    } catch (error) {
        return errorResponse(res, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS);
    }
};

export const isAdmin = (req, res, next) => {
    try {
        const token = getToken(req);

        if (token === null) { 
            return res.sendStatus(401);
        }

        let userDetails = verifyToken(token);

        if(!userDetails) {
            return errorResponse(res, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS);
        }

        // if(!userDetails.isAdmin) {
        //     return errorResponse(res, statusCodes.FORBIDDEN, messages.ACCESS_FORBIDDEN);
        // }

        next();
        
    } catch (error) {
        return errorResponse(res, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS);
    }
};