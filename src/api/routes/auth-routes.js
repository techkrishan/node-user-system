import { register, login, forgotPassword, emailVerification, setPassword } from "../controllers/auth-controller.js";
import { validateRegistration, validateLogin, validateForgotPassword, validateSetPassword,validateVerification } from "../validations/user-validations.js";

const authRoutes = (router) => {
    router.route('/auth/register').post(validateRegistration(), register);
    router.route('/auth/login').post(validateLogin(), login);
    router.route('/auth/forgot-password').post(validateForgotPassword(), forgotPassword);
    router.route('/auth/set-password').post(validateSetPassword(), setPassword);
    router.route('/auth/email/verification').post(validateVerification(), emailVerification);
};

export default authRoutes;