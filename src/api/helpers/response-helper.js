import { statusCodes } from "../config/status-code.js";
import messages from "../messages/response-messages.js";

export const formatValidationErrors = (errors) => {
    let fieldErrors = {};
    if(errors.errors) {
        for(let index in errors.errors) {
            fieldErrors[errors.errors[index]['param']]=errors.errors[index]['msg']; 
        }
    }
    
    return fieldErrors;
}

export const response = (res, statusCode=200, data=null, message='', isValidationError=false) => {
    let responseData = {
        message: message,
        data: data,
        errors: null
    };

    if(isValidationError) {
        responseData.errors = data;
        delete responseData.data;
    } else {
        delete responseData.errors;
    }

    return res.status(statusCode).send(responseData);
};

export const validationErrorResponse = (res, errors) => {
    return response(res, statusCodes.UNPROCESSABLE_ENTITY, formatValidationErrors(errors), messages.UNPROCESSABLE_ENTITY, true);
};

export const createdResponse = (res, message, data) => {
    return response(res, statusCodes.CREATED, data, message);
};

export const successResponse = (res, message, data) => {
    return response(res, statusCodes.OK, data, message);
};

export const errorResponse = (res, code, message, data=null) => {
    return response(res, code, data, message);
};