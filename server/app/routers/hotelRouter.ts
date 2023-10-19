import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createHotel from '../controllers/hotel/createHotel';
import getHotels from '../controllers/hotel/getHotels';
import deleteHotel from '../controllers/hotel/deleteHotel';
import updateHotel from '../controllers/hotel/updateHotel';
import getHotel from '../controllers/hotel/getHotel';
import validateRequest from '../middleware/validateRequest';
import { HotelValidation } from '../validations/hotelValidation';

//routes
router.get(
    '/',
    getHotels
);

router.get(
    '/:hotelId',
    getHotel
);

router.post(
    '/',
    validateRequest(HotelValidation.createHotelZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    createHotel
);

router.patch(
    '/:hotelId',
    validateRequest(HotelValidation.updateHotelZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    updateHotel
);

router.delete(
    '/:hotelId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    deleteHotel
);

export default router;