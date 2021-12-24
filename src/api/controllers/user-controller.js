import { validationResult } from "express-validator";
import { statusCodes } from "../config/status-code.js";
import { createdResponse, validationErrorResponse, errorResponse, successResponse } from "../helpers/response-helper.js";
import messages from "../messages/response-messages.js";
import { saveUser, findUsers, findUser, deleteUser } from "../services/user-service.js";


export const store = async (req, res) => {
    try {
        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        // Save user in the database            
        let userData = await saveUser(req);
        
        return createdResponse(res, messages.USER_CREATE_SUCCESS, userData);

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const index = async (req, res) => {
    try {
        let users = await findUsers(req);
        return successResponse(res, 'Success', users);
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const show = async (req, res) => {
    try {
        let user = await findUser(req.params.userId);
        if(!user) {
            return errorResponse(res, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }

        return successResponse(res, 'Success', user);
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const update = async (req, res) => {
    try {
        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }

        let user = await findUser(req.params.userId);
        if(!user) {
            return errorResponse(res, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }
        // Save user in the database            
        let userData = await saveUser(req, req.params.userId);
        
        return createdResponse(res, messages.USER_UPDATE_SUCCESS, userData);

    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};


export const destroy = async (req, res) => {
    try {

        let user = await findUser(req.params.userId);        
        if(!user) {
            return errorResponse(res, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
        }

        let response = await deleteUser(req.params.userId);
        return createdResponse(res, messages.USER_DELETED_SUCCESS, response);
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};

export const bulkAction = (req, res) => {
    try {

        // Validate request data for register a user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorResponse(res, errors);
        }
        
        let requestData = {
            action: req.body.action,
            ids: req.body.ids
        };

        console.log(requestData);
        return createdResponse(res, messages.USER_CREATE_SUCCESS, requestData);
    } catch (error) {
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, error.message || messages.INTERNAL_SERVER_ERROR);
    }
};