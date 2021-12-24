// Import environment variables
import userRoutes from "./user-routes.js";
import authRoutes from "./auth-routes.js";
import userAccountRoutes from "./user-account-routes.js";


const routes = (app, router) => {
    
    // Unauthorized routes
    authRoutes(router);

    // Authorized routes.
    userRoutes(router);

    userAccountRoutes(router);
    
    app.use('/api', router);
};

export default routes;