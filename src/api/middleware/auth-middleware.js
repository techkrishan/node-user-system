import { verifyToken, getToken, getTokenData } from "../helpers/auth-helper.js";
import { errorResponse } from "../helpers/response-helper.js";
import { statusCodes } from "../config/status-code.js";
import messages from "../messages/response-messages.js";

export const authenticate = (req, res, next) => {
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

export const authorized = (...allowedRoles) => {
    return (req, res, next) => {
        const authData = getTokenData(req);
        
        if(!authData.isAdmin && !iAuthorized(authData.role, allowedRoles)) {
            return errorResponse(res, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED_ROLE_ACCESS);
        }
        
        next();
    };
};

const iAuthorized = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
};