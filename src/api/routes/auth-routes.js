import express from 'express';
import { register, login, forgotPassword, emailVerification, setPassword } from "../controllers/auth-controller.js";
import { validateRegistration, validateLogin, validateForgotPassword, validateSetPassword,validateVerification } from "../validations/user-validations.js";

const authRoutes = () => {
    const router = express.Router();
    router.route('/register').post(validateRegistration(), register);
    router.route('/login').post(validateLogin(), login);
    router.route('/forgot-password').post(validateForgotPassword(), forgotPassword);
    router.route('/set-password').post(validateSetPassword(), setPassword);
    router.route('/email/verification').post(validateVerification(), emailVerification);
    return router;
};

export default authRoutes;