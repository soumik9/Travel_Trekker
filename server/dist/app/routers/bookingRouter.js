"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const CreateOrderBook_1 = __importDefault(require("../controllers/booking/CreateOrderBook"));
const GetOrdersById_1 = __importDefault(require("../controllers/booking/GetOrdersById"));
const GetBookings_1 = __importDefault(require("../controllers/booking/GetBookings"));
const GetOrder_1 = __importDefault(require("../controllers/booking/GetOrder"));
const UpdateBookingStatusAdmin_1 = __importDefault(require("../controllers/booking/UpdateBookingStatusAdmin"));
//routes
router.get('/by-auth-id', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.USER), GetOrdersById_1.default);
router.get('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), GetBookings_1.default);
router.get('/:orderId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.USER), GetOrder_1.default);
router.post('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.USER, constants_1.ENUM_USER_ROLE.ADMIN), CreateOrderBook_1.default);
router.patch('/update-status-admin/:bookingId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), UpdateBookingStatusAdmin_1.default);
// router.delete(
//     '/:faqId',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     deleteFaq
// );
exports.default = router;
