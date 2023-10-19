"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const createHotel_1 = __importDefault(require("../controllers/hotel/createHotel"));
const getHotels_1 = __importDefault(require("../controllers/hotel/getHotels"));
const deleteHotel_1 = __importDefault(require("../controllers/hotel/deleteHotel"));
const updateHotel_1 = __importDefault(require("../controllers/hotel/updateHotel"));
const getHotel_1 = __importDefault(require("../controllers/hotel/getHotel"));
//routes
router.get('/', getHotels_1.default);
router.get('/:hotelId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.USER), getHotel_1.default);
router.post('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), createHotel_1.default);
router.patch('/:hotelId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), updateHotel_1.default);
router.delete('/:hotelId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), deleteHotel_1.default);
exports.default = router;
