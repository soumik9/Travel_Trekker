import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createHotel from '../controllers/hotel/createHotel';
import getHotels from '../controllers/hotel/getHotels';
import deleteHotel from '../controllers/hotel/deleteHotel';
import updateHotel from '../controllers/hotel/updateHotel';
import getHotel from '../controllers/hotel/getHotel';

//routes
router.get(
    '/',
    getHotels
);

router.get(
    '/:hotelId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    getHotel
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createHotel
);

router.patch(
    '/:hotelId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    updateHotel
);

router.delete(
    '/:hotelId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    deleteHotel
);

export default router;