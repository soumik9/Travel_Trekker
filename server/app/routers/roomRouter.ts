import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createHotel from '../controllers/hotel/createHotel';

//routes
router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createHotel
);

export default router;