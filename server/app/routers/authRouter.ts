import express from 'express'
const router = express.Router();

import profile from '../controllers/auth/profile';
import signin from '../controllers/auth/signin';
import signup from '../controllers/auth/signup';

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';


//routes
router.post('/signin', signin);

router.post(
    '/signup',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    signup
);

router.get(
    '/profile',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    profile
);

export default router;