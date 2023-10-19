import express from 'express'
const router = express.Router();

import auth from '../middleware/auth'
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import createOrderBook from '../controllers/booking/CreateOrderBook';
import GetOrdersById from '../controllers/booking/GetOrdersById';
import getBookings from '../controllers/booking/GetBookings';

//routes
router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    getBookings
);

// router.get(
//     '/:faqId',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     getFaq
// );

router.get(
    '/by-auth-id',
    auth(ENUM_USER_ROLE.USER),
    GetOrdersById
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    createOrderBook
);

// router.patch(
//     '/:faqId',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     updateFaq
// );

// router.delete(
//     '/:faqId',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     deleteFaq
// );

export default router;