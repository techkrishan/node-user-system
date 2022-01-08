import { validationResult } from "express-validator";
import { statusCodes } from "../config/status-code.js";
import { createdResponse, validationErrorResponse, errorResponse, successResponse } from "../helpers/response-helper.js";
import messages from "../messages/response-messages.js";
import { saveUser, userLogin, userForgotPassword, userEmailVerification, userSetPassword } from "../services/user-service.js";


export const register = async (req, res) => {

    try {
        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        req.body.role = 'user';
        req.body.status = 'pending';
        req.body.email_verification = true;

        // Save user in the database            
        let userData = await saveUser(req);

        return createdResponse(res, messages.USER_REGISTER_SUCCESS, userData);

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const login = async (req, res) => {
    try {
        
        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let loginResult = await userLogin(req);

        if(loginResult.result) {
            return successResponse(res, null, loginResult.data);
        }

        return errorResponse(res, statusCodes.UNAUTHORIZED, loginResult.message);

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const forgotPassword = async (req, res) => {
    try{
        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let response = await userForgotPassword(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const emailVerification = async (req, res) => {
    try{
        // Validate request data for email verification
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let response = await userEmailVerification(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const setPassword = async (req, res) => {
    try{
        // Validate request data for set password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let response = await userSetPassword(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};