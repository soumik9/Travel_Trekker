"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authRouter_1 = __importDefault(require("./authRouter"));
const hotelRouter_1 = __importDefault(require("./hotelRouter"));
const roomRouter_1 = __importDefault(require("./roomRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const faqRouter_1 = __importDefault(require("./faqRouter"));
const bookingRouter_1 = __importDefault(require("./bookingRouter"));
const reviewRouter_1 = __importDefault(require("./reviewRouter"));
const newsRouter_1 = __importDefault(require("./newsRouter"));
const apiRoutes = [
    {
        path: '/auth',
        route: authRouter_1.default,
    },
    {
        path: '/user',
        route: userRouter_1.default,
    },
    {
        path: '/hotel',
        route: hotelRouter_1.default,
    },
    {
        path: '/room',
        route: roomRouter_1.default,
    },
    {
        path: '/faq',
        route: faqRouter_1.default,
    },
    {
        path: '/booking',
        route: bookingRouter_1.default,
    },
    {
        path: '/review',
        route: reviewRouter_1.default,
    },
    {
        path: '/news',
        route: newsRouter_1.default,
    },
];
apiRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
