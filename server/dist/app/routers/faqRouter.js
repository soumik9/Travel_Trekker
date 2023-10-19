"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const getFaqs_1 = __importDefault(require("../controllers/faq/getFaqs"));
const getFaq_1 = __importDefault(require("../controllers/faq/getFaq"));
const createFaq_1 = __importDefault(require("../controllers/faq/createFaq"));
const updateFaq_1 = __importDefault(require("../controllers/faq/updateFaq"));
const deleteFaq_1 = __importDefault(require("../controllers/faq/deleteFaq"));
//routes
router.get('/', getFaqs_1.default);
router.get('/:faqId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), getFaq_1.default);
router.post('/', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), createFaq_1.default);
router.patch('/:faqId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), updateFaq_1.default);
router.delete('/:faqId', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), deleteFaq_1.default);
exports.default = router;
