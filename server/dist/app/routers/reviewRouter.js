"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const CreateReview_1 = __importDefault(require("../controllers/review/CreateReview"));
const GetReviews_1 = __importDefault(require("../controllers/review/GetReviews"));
//routes
router.get('/', GetReviews_1.default);
router.post('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.USER), CreateReview_1.default);
exports.default = router;
