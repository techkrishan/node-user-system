
import { auth } from "../middleware/auth-middleware.js";
import { getProfile, updateProfile, changePassword, sendEmailVerificationCode } from "../controllers/user-account-controller.js";
import { validateUserAccount, validateVerificationCode } from "../validations/user-validations.js";

const userAccountRoutes = (router) => {
    router.use(auth);
    
    router.route('/user-account/profile')
        .get(getProfile)
        .put(validateUserAccount('update_profile'), updateProfile);

    router.route('/user-account/change-password').post(validateUserAccount('change_password'), changePassword);
    router.route('/user-account/email-verification-code').post(sendEmailVerificationCode);
};

export default userAccountRoutes;