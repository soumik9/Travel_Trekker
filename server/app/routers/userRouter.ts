import express from 'express'
const router = express.Router();

// controllers
import getUser from '../controllers/user/getUser';
import getUsers from '../controllers/user/getUsers';
import updateUser from '../controllers/user/updateUser';
import deleteUser from '../controllers/user/deleteUser';

// middleware
import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import updateUserByAuthId from '../controllers/user/updateUserByAuthId';

//routes
router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    getUsers
);

router.get(
    '/:userId',
    auth(ENUM_USER_ROLE.ADMIN),
    getUser
);

router.patch(
    '/authenticated-id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    updateUserByAuthId
);

router.patch(
    '/:userId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    updateUser
);

router.delete(
    '/:userId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    deleteUser
);

export default router;