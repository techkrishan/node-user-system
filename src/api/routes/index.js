// Import environment variables
import express from 'express';
import { authenticate } from "../middleware/auth-middleware.js";
import userRoutes from "./user-routes.js";
import authRoutes from "./auth-routes.js";
import userAccountRoutes from "./user-account-routes.js";


const apiRouters = () => {
    const router = express.Router();
    
    // Unauthorized routes
    router.use('/auth', authRoutes());

    // Authenticated routes
    router.use(authenticate);

    router.use('/users', userRoutes());
    router.use('/user-account', userAccountRoutes());
    
    return router;
};

export default apiRouters;