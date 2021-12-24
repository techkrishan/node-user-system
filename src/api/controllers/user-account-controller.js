import { validationResult } from "express-validator";
import { statusCodes } from "../config/status-code.js";
import { validationErrorResponse, errorResponse, successResponse } from "../helpers/response-helper.js";
import { findUser, updateProfileDetails, userChangePassword, userSendEmailVerificationCode } from "../services/user-service.js";
import messages from "../messages/response-messages.js";
import { getTokenData } from "../helpers/auth-helper.js";


export const getProfile = async (req, res) => {
    try {

        let authData = getTokenData(req);

        let user = await findUser(authData.id);
        if(!user) {
            return errorResponse(res, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }

        return successResponse(res, 'Success', user);
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const updateProfile = async (req, res) => {
    try {
        // Validate request data for update profile
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let response = await updateProfileDetails(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const changePassword = async (req, res) => {
    try {
        // Validate request data for change password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let response = await userChangePassword(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const sendEmailVerificationCode = async (req, res) => {
    try {
        let response = await userSendEmailVerificationCode(req);
        if(response.result) {
            return successResponse(res, response.message);
        } else {
            return errorResponse(res, statusCodes.UNPROCESSABLE_ENTITY, response.message);
        }

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};