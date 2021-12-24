
import { isAdmin } from "../middleware/auth-middleware.js";
import { store, index, show, update, destroy, bulkAction } from "../controllers/user-controller.js";
import { userValidate } from "./../validations/user-validations.js";

const userRoutes = (router) => {
    router.use(isAdmin);
    router.route('/users')
        .get(index)
        .post(userValidate('create_or_update'), store)
        .patch(userValidate('bulk_action'), bulkAction);

    router.route('/users/:userId')
        .get(show)
        .put(userValidate('create_or_update'), update)
        .delete(destroy);
};

export default userRoutes;