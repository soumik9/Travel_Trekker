import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createOrderBook from '../controllers/booking/CreateOrderBook';
import GetOrdersById from '../controllers/booking/GetOrdersById';
import getBookings from '../controllers/booking/GetBookings';
import GetBooking from '../controllers/booking/GetOrder';
import UpdateBookingStatusAdmin from '../controllers/booking/UpdateBookingStatusAdmin';
import validateRequest from '../middleware/validateRequest';
import { BookingValidation } from '../validations/boookingValidation';
import UpdateCancelStatus from '../controllers/booking/UpdateCancelStatus';


//routes
router.get(
    '/by-auth-id',
    auth(ENUM_USER_ROLE.USER),
    GetOrdersById
);

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    getBookings
);

router.get(
    '/:orderId',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    GetBooking
);

router.post(
    '/',
    validateRequest(BookingValidation.createBookingZodSchema),
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    createOrderBook
);

router.patch(
    '/update-status-admin/:bookingId',
    validateRequest(BookingValidation.updateBookingStatusZodSchema),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UpdateBookingStatusAdmin
);

router.patch(
    '/user/update-cancel-admin/:bookingId',
    auth(ENUM_USER_ROLE.USER),
    UpdateCancelStatus
);

// router.delete(
//     '/:faqId',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     deleteFaq
// );

export default router;