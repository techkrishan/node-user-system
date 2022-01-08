import userModel from '../models/user-model.js';
import { paginateOptions } from '../helpers/pagination-helper.js';
import { sortingOptions, searchOptions } from '../helpers/search-helper.js';
import { generateToken, authUser } from '../helpers/auth-helper.js';
import { encryptPassword, comparePassword } from '../helpers/common-helper.js';
import { generateCode } from '../../utils/common.js';
import messages from '../messages/response-messages.js';
import env from './../config/env.js';
// import { sendEmail } from './email-service.js';


const sortableField = ['first_name', 'last_name', 'name', 'email', 'created_at', 'updated_at'];

export const findUsers = async (req) => {
    
    const sortByObj = sortingOptions(req, sortableField)
    const searchString = searchOptions(req);
    
    let conditions = {is_deleted: 0};
    if(searchString !== false) {
        conditions = {...searchString, ...conditions};
    }
    let paginationOptions = paginateOptions(req, sortByObj);
    return userModel.paginate(conditions, paginationOptions);
};


export const findUser = async (userId) => {
    return userModel.findOne({_id: userId, is_deleted: false}).exec();
};


export const saveUser = async (req, userId=null) => {

    let requestData = {
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        name: req.body.first_name + ' ' + req.body.last_name,
        email: req.body.email,
        phone: req.body.phone ?? null,
        status: req.body.status,
        description: req.body.description ?? null,
        password: req.body.password ?? null
    };
    
    if(requestData['password']) {
        requestData['password'] = await encryptPassword(requestData['password']);
    }

    if(req.body.email_verification) {
        requestData.email_verification_code = await generateUniqueCode('email_verification');
        requestData.email_verification_code_expiry = new Date();
    }

    if(userId) {
        return userModel.findOneAndUpdate({_id: userId}, requestData, {new: true}).exec();
    } else {
        // await sendEmail(requestData.email);
        return userModel.create(requestData);
    }        
};

export const deleteUser = (userId) => {
    return userModel.updateOne({_id: userId, is_deleted: false}, {is_deleted: true}).exec();
};

export const findByIds = async (userIds) => {
    return userModel.find({_id: {"$in": userIds}}).select({_id});
};

export const bulkAction = (req) => {
    console.log("Bulk Action!");
};

export const userLogin = async (req) => {
    let user = await userModel.findOne({email: req.body.email, is_deleted: false}).exec();
    
    if(user) {
        // check user password with hashed password stored in the database
        const isValidPassword = await comparePassword(req.body.password, user.password);

        if(isValidPassword) {
            let data = user.toJSON();
            data.token = generateToken({id: user.id, isAdmin: user.is_admin, role:user.role});
            return {result: true, data: data};
        }
    }
    return {result: false, message: messages.INVALID_LOGIN_CREDENTIALS};
};

export const userForgotPassword = async (req) => {
    let response = {result: false};
    let user = await userModel.findOne({email: req.body.email, is_deleted: false}).exec();
        
    if(user) {
        const code = await generateUniqueCode('forgot_password');
        let result = await userModel.updateOne({_id: user.id}, {forgot_password_code: code, forgot_password_code_expiry: new Date()}).exec();
        if(result.modifiedCount > 0) {
            response.result = true;
            response.message = messages.FORGOT_PASSWORD_CODE_GENERATED;
        } else {
            response.message = messages.FORGOT_PASSWORD_CODE_NOT_GENERATED;
        }
    } else {
        response.message = messages.USER_EMAIL_DOES_NOT_EXISTS;
    }
    return response;
};


export const generateUniqueCode = async (field) => {
    let code = generateCode(env.UNIQUE_CODE_LENGTH);
    let conditions = {};
    if(field === 'forgot_password') {
        conditions.forgot_password_code = code;
    } else if(field === 'email_verification') {
        conditions.email_verification_code = code;
    }
    let user = await userModel.find(conditions);
    if(user.length < 1) {
        return code;
    }
    return generateUniqueCode(field);
};

export const userEmailVerification = async (req) => {
    let response = {result: false};
    let user = await userModel.findOne({email_verification_code: req.body.code, is_deleted: false}).exec();
    if(user) {
        let result = await userModel.updateOne({_id: user.id}, {is_verified: true, email_verification_code: null, email_verification_code_expiry: null}).exec();
        if(result.modifiedCount > 0) {
            response.result = true;
            response.message = messages.EMAIL_VERIFIED;
        } else {
            response.message = messages.EMAIL_COULD_NOT_VERIFIED;
        }
    } else {
        response.message = messages.EMAIL_VERIFICATION_CODE_DOES_NOT_EXISTS;
    }
    return response;
};

export const userSetPassword = async (req) => {
    let response = {result: false};
    let user = await userModel.findOne({forgot_password_code: req.body.code, is_deleted: false}).exec();
    if(user) {
        let requestData = {
            forgot_password_code: null,
            forgot_password_code_expiry: null,
            password: await encryptPassword(req.body.password)
        };
        let result = await userModel.updateOne({_id: user.id}, requestData).exec();
        if(result.modifiedCount > 0) {
            response.result = true;
            response.message = messages.PASSWORD_SET;
        } else {
            response.message = messages.PASSWORD_COULD_NOT_SET;
        }
    } else {
        response.message = messages.EMAIL_VERIFICATION_CODE_DOES_NOT_EXISTS;
    }
    return response;
};

export const updateProfileDetails = async (req) => {
    let response = {result: false};
    let user = await authUser(req);

    let requestData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        name: req.body.first_name + ' ' + req.body.last_name,
        phone: req.body.phone ?? null,
        description: req.body.description ?? null,
    };        
    
    let result = await userModel.updateOne({_id: user.id}, requestData).exec();  
    if(result.modifiedCount > 0) {
        response.result = true;
        response.message = messages.USER_PROFILE_UPDATED;
    } else {
        response.message = messages.USER_PROFILE_COULD_NOT_UPDATED;
    }
    return response;
};

export const userChangePassword = async (req) => {
    let response = {result: false};
    let user = await authUser(req);
    const isValidPassword = await comparePassword(req.body.old_password, user.password);

    if(isValidPassword) {
        let requestData = {
            password: await encryptPassword(req.body.password)
        };
        
        let result = await userModel.updateOne({_id: user.id}, requestData).exec();
        if(result.modifiedCount > 0) {
            response.result = true;
            response.message = messages.PASSWORD_CHANGED;
        } else {
            response.message = messages.PASSWORD_COULD_NOT_CHANGED;
        }
    } else {
        response.message = messages.OLD_PASSWORD_NOT_MATCHED;
    }
    return response;
};

export const userSendEmailVerificationCode = async (req) => {
    let response = {result: false};
    let user = await authUser(req);
        
    if(user) {
        const code = await generateUniqueCode('email_verification');
        let result = await userModel.updateOne({_id: user.id}, {email_verification_code: code, email_verification_code_expiry: new Date()}).exec();
        if(result.modifiedCount > 0) {
            response.result = true;
            response.message = messages.EMAIL_VERIFICATION_CODE_GENERATED;
        } else {
            response.message = messages.EMAIL_VERIFICATION_CODE_NOT_GENERATED;
        }
    } else {
        response.message = messages.USER_DOES_NOT_EXISTS;
    }
    return response;
};