import express from 'express';
import { getProfile, updateProfile, changePassword, sendEmailVerificationCode } from "../controllers/user-account-controller.js";
import { validateUserAccount } from "../validations/user-validations.js";

const userAccountRoutes = () => {
    const router = express.Router();
    router.route('/profile')
        .get(getProfile)
        .put(validateUserAccount('update_profile'), updateProfile);

    router.route('/change-password').post(validateUserAccount('change_password'), changePassword);
    router.route('/email-verification-code').post(sendEmailVerificationCode);
    return router;
};

export default userAccountRoutes;