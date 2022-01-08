const messages = {
    UNPROCESSABLE_ENTITY: 'Some validation errors.',

    INVALID_LOGIN_CREDENTIALS: 'Login credentials are not valid.',    

    USER_REGISTER_SUCCESS: 'Your information has been save, Please check your email for further steps.',
    USER_CREATE_SUCCESS: 'User details has been saved successfully.',
    USER_UPDATE_SUCCESS: 'User details has been updated successfully.',
    USER_DELETED_SUCCESS: "User has been deleted",
    BULK_USER_DELETED_SUCCESS: "Users have been deleted",
    BULK_USER_ACTIVATED_SUCCESS: "Users have been activated",
    BULK_USER_DEACTIVATED_SUCCESS: "Users have been deactivated",

    EMAIL_DOES_NOT_EXISTS: 'The provide email does not exists.',
    USER_EMAIL_DOES_NOT_EXISTS: 'User with this email does not exists.',
    USER_DOES_NOT_EXISTS: 'User does not exists.',

    EMAIL_VERIFICATION_CODE_GENERATED: 'The email verification code has been sent on your registered email address. Please check your email for further steps.',
    EMAIL_VERIFICATION_CODE_NOT_GENERATED: 'The email verification code could not be generated.',
    FORGOT_PASSWORD_CODE_NOT_GENERATED: 'The forgotten password code could not be generated.',
    FORGOT_PASSWORD_CODE_GENERATED: 'The set password code has been sent on your registered email address. Please check your email for further steps.',

    EMAIL_VERIFIED: 'Email has been verified successfully.',
    EMAIL_COULD_NOT_VERIFIED: 'Email could not be verified please try again.',
    EMAIL_VERIFICATION_CODE_DOES_NOT_EXISTS: 'Email verification code does not exists',

    PASSWORD_SET: 'Password set successfully.',
    PASSWORD_COULD_NOT_SET: 'Password could not be set.',

    INTERNAL_SERVER_ERROR: 'Some error occurred',
    USER_NOT_FOUND: 'User does not exists',

    UNAUTHORIZED_ACCESS: "Unauthorized access!",
    UNAUTHORIZED_ROLE_ACCESS: "You are not authorized to perform this action.",
    ACCESS_FORBIDDEN: "You are not authorized for this action.",

    PASSWORD_CHANGED: "Password has been updated.",
    PASSWORD_COULD_NOT_CHANGED: "Password could not be changed.",
    OLD_PASSWORD_NOT_MATCHED: "Old password did not match with the current password.",

    USER_PROFILE_UPDATED: "User profile details has been updated.",
    USER_PROFILE_COULD_NOT_UPDATED: "User profile could not be updated."
};

export default messages;