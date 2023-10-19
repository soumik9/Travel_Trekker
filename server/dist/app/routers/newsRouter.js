"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// middleware
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const GetNews_1 = __importDefault(require("../controllers/news/GetNews"));
const CreateNews_1 = __importDefault(require("../controllers/news/CreateNews"));
const DeleteNews_1 = __importDefault(require("../controllers/news/DeleteNews"));
//routes
router.get('/', GetNews_1.default);
router.post('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.SUPER_ADMIN), CreateNews_1.default);
router.delete('/:newsId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), DeleteNews_1.default);
exports.default = router;
