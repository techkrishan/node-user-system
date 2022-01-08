import express from 'express';
import { authorized } from "../middleware/auth-middleware.js";
import { store, index, show, update, destroy, bulkAction } from "../controllers/user-controller.js";
import { userValidate } from "./../validations/user-validations.js";

const userRoutes = () => {
    const router = express.Router();
    router.route('/')
            .get(authorized(), index)
            .post(authorized(), userValidate('create_or_update'), store)
            .patch(authorized(), userValidate('bulk_action'), bulkAction)

    router.route('/:userId')
        .get(authorized(), show)
        .put(authorized(), userValidate('create_or_update'), update)
        .delete(authorized(), destroy);

    return router;
};

export default userRoutes;