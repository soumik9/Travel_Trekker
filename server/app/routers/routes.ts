import express from 'express';
const router = express.Router();

import authRouter from './authRouter'
import hotelRouter from './hotelRouter'
import roomRouter from './roomRouter'


const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/hotel',
        route: hotelRouter,
    },
    {
        path: '/room',
        route: roomRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;