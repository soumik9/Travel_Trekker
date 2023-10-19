import express from 'express'
const router = express.Router();

import profile from '../controllers/auth/profile';
import signin from '../controllers/auth/signin';
import signup from '../controllers/auth/signup';

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import userSignup from '../controllers/auth/userSignup';
import validateRequest from '../middleware/validateRequest';
import { AuthValidation } from '../validations/authValication';


//routes
router.post(
    '/signin',
    validateRequest(AuthValidation.loginZodSchema),
    signin
);

router.post(
    '/user/signup',
    validateRequest(AuthValidation.signupUserZodSchema),
    userSignup
);

router.post(
    '/signup',
    validateRequest(AuthValidation.signupZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    signup
);

router.get(
    '/profile',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    profile
);

export default router;