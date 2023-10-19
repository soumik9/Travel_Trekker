"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const createRoom_1 = __importDefault(require("../controllers/room/createRoom"));
const getRooms_1 = __importDefault(require("../controllers/room/getRooms"));
const updateRoom_1 = __importDefault(require("../controllers/room/updateRoom"));
const getRoom_1 = __importDefault(require("../controllers/room/getRoom"));
const deleteRoom_1 = __importDefault(require("../controllers/room/deleteRoom"));
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const roomValidation_1 = require("../validations/roomValidation");
//routes
router.get('/', getRooms_1.default);
router.get('/:roomId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.USER), getRoom_1.default);
router.post('/', (0, validateRequest_1.default)(roomValidation_1.RoomValidation.createRoomZodSchema), (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), createRoom_1.default);
router.patch('/:roomId', (0, validateRequest_1.default)(roomValidation_1.RoomValidation.updateRoomZodSchema), (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), updateRoom_1.default);
router.delete('/:roomId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), deleteRoom_1.default);
exports.default = router;
