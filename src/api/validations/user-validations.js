import { body } from 'express-validator';
import mongoose from 'mongoose';
import userModel from '../models/user-model.js';
import { constants } from '../config/constants.js';
import { isDateTimeExpired } from '../../utils/common.js';
import env from '../config/env.js';


let userNameRules = [ 
    body('first_name')
        .notEmpty().withMessage("First name is required").bail()
        .isLength({ max: 50}).withMessage("First name must be less than 50 characters")
        .trim(),
    body('last_name')
        .notEmpty().withMessage("Last name is required").bail()
        .isLength({ max: 50}).withMessage("Last name must be less than 50 characters")
        .trim()
];

let userEmailRules = [
    body('email')
        .notEmpty().withMessage("Email is required").bail()
        .isLength({ max: 150}).withMessage("Email must be less than 150 characters").bail()
        .isEmail().withMessage("Email is not valid").bail()
        .trim()
        .custom( async (value) => {
            return userModel.findOne({email: value, is_deleted: false}).then((result) => {
                if(result) {
                    return Promise.reject('This email is already in used by other user.');
                }                            
            });
        })
];

let userPasswordRules = [
    body('password')
        .notEmpty().withMessage("Password is required").bail()
        .isLength({ min: 6}).withMessage("The password must contain 6 characters").bail()
        .isLength({ max: 20}).withMessage("The password must not be greater than 20 characters")
];

let phoneRules = [
    body('phone')
        .optional()
        .isLength({ min: 10}).withMessage("Phone must be contain at-least 10 characters").bail()
        .isLength({ max: 12}).withMessage("Phone must be contain at-most 12 characters").bail()
        .isMobilePhone().withMessage("Please provide a valid mobile phone.")
        .trim()
];

let descriptionRules = [
    body('description')
        .optional()
        .isLength({ max: 5000}).withMessage("Status must be contain at-most 500 characters")
];

export const validateRegistration = () => {
    return [...userNameRules, ...userEmailRules, ...userPasswordRules];
};

export const validateLogin = () => {
    return [ 
        body('email')
            .notEmpty().withMessage("The email is required").bail()
            .isEmail().withMessage("The email is not valid")
            .trim()
    ].concat(userPasswordRules)
};

export const validateForgotPassword = () => {
    return [ 
        body('email')
            .notEmpty().withMessage("The email is required").bail()
            .isEmail().withMessage("The email is not valid").bail()
            .trim()
            .custom( async (value) => {
                return userModel.findOne({email: value, is_deleted: false}).then((result) => {
                    if(!result) {
                        return Promise.reject('The provide email does not exists');
                    }                            
                });
            })
    ];
};

export const validateSetPassword = () => {
    return [ 
        body('code')
            .notEmpty().withMessage("Set password code is required").bail()
            .isLength({ min: 6 }).withMessage("Set password code should be 6 characters").bail()
            .isLength({ max: 6 }).withMessage("Set password code should be 6 characters").bail()
            .trim()
            .custom( async (value) => {
                return userModel.findOne({forgot_password_code: value, is_deleted: false}).then((result) => {
                    if(!result) {
                        return Promise.reject('Set password code is invalid');
                    }

                    if(isDateTimeExpired(result.forgot_password_code_expiry, env.SET_PASSWORD_CODE_EXPIRY)) {
                        return Promise.reject('Set password code is expired');
                    }
                });
            })
    ].concat(userPasswordRules);
};

export const validateVerificationCode = () => {
    return [ 
        body('user_id')
            .notEmpty().withMessage("The user ID is required").bail()
            .trim()
            .custom( async (value) => {
                
                if(!mongoose.Types.ObjectId.isValid(value)) {
                    return Promise.reject("User ID is not valid");
                }

                return userModel.findOne({_id: value, is_deleted: false}).then((result) => {
                    if(!result) {
                        return Promise.reject('The user does not exists');
                    }                            
                });
            })
    ];
};

export const validateVerification = () => {
    return [ 
        body('code')
            .notEmpty().withMessage("The verification code is required").bail()
            .isLength({ min: 6}).withMessage("Verification code should be 6 characters").bail()
            .isLength({ max: 6}).withMessage("Verification code should be 6 characters").bail()
            .trim()
            .custom( async (value) => {
                return userModel.findOne({email_verification_code: value, is_deleted: false}).then((result) => {
                    
                    if(!result) {
                        return Promise.reject('Verification code is invalid');
                    }
                    
                    if(isDateTimeExpired(result.email_verification_code_expiry, env.EMAIL_VERIFICATION_CODE_EXPIRY)) {
                        return Promise.reject('Verification code is expired');
                    }
                });
            })
    ];
};

export const validateUserAccount = (method) => {
    switch (method) {
        case 'update_profile': {
            return [...userNameRules, phoneRules, descriptionRules];
        }
        case 'change_password': {
            return [ 
                body('old_password')
                    .notEmpty().withMessage("Old password is required").bail()
                    .isLength({ min: 6}).withMessage("Old password must contain 6 characters").bail()
                    .isLength({ max: 20}).withMessage("Old password must not be greater than 20 characters")
                    .trim()
            ].concat(userPasswordRules)
        }
    }
};

export const userValidate = (method) => {
    
    switch (method) {
        case 'create_or_update': {
            return [...userNameRules, userEmailRules, phoneRules, descriptionRules].concat([
                body('role')
                    .notEmpty().withMessage("Role is required").bail()
                    .isLength({ max: 15}).withMessage("Role must be contain at-most 15 characters").bail()
                    .isIn(['user','public']).withMessage("Please provide a valid role (user, public).")
                    .trim(),
                body('status')
                    .notEmpty().withMessage("Status is required").bail()
                    .isLength({ max: 15}).withMessage("Status must be contain at-most 15 characters").bail()
                    .isIn(['active','inactive']).withMessage("Please provide a valid status (active, inactive).")
                    .trim()
            ]);
        }
        case 'bulk_action': {
            return [ 
                body('action')
                    .notEmpty().withMessage("Action is required").bail()
                    .isIn(constants.BULK_ACTIONS).withMessage("The action is not valid")
                    .trim(),
                body('ids')
                    .notEmpty().withMessage("User IDs array is required").bail()
                    .custom( async (userIds) => {
                        let rows = await userModel.find({_id: {"$in": userIds}});
                        if(rows.length !== userIds.length) {
                            return Promise.reject('The provided user IDs are invalid.');
                        }
                    })
            ]
        }
    }
};