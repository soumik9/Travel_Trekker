"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// controllers
const getUser_1 = __importDefault(require("../controllers/user/getUser"));
const getUsers_1 = __importDefault(require("../controllers/user/getUsers"));
const updateUser_1 = __importDefault(require("../controllers/user/updateUser"));
const deleteUser_1 = __importDefault(require("../controllers/user/deleteUser"));
// middleware
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const updateUserByAuthId_1 = __importDefault(require("../controllers/user/updateUserByAuthId"));
//routes
router.get('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), getUsers_1.default);
router.get('/:userId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.ADMIN), getUser_1.default);
router.patch('/authenticated-id', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.USER), updateUserByAuthId_1.default);
router.patch('/:userId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), updateUser_1.default);
router.delete('/:userId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), deleteUser_1.default);
exports.default = router;
