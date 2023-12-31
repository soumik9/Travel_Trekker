import express from 'express';
const router = express.Router();

import authRouter from './authRouter'
import hotelRouter from './hotelRouter'
import roomRouter from './roomRouter'
import userRouter from './userRouter'
import faqRouter from './faqRouter'
import bookingRouter from './bookingRouter'
import reviewRouter from './reviewRouter'
import newsRouter from './newsRouter'


const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/hotel',
        route: hotelRouter,
    },
    {
        path: '/room',
        route: roomRouter,
    },
    {
        path: '/faq',
        route: faqRouter,
    },
    {
        path: '/booking',
        route: bookingRouter,
    },
    {
        path: '/review',
        route: reviewRouter,
    },
    {
        path: '/news',
        route: newsRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;