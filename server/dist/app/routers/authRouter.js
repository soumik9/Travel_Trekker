"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const profile_1 = __importDefault(require("../controllers/auth/profile"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const auth_1 = __importDefault(require("../middleware/auth"));
const constants_1 = require("../../utils/constants/constants");
const userSignup_1 = __importDefault(require("../controllers/auth/userSignup"));
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const authValication_1 = require("../validations/authValication");
//routes
router.post('/signin', (0, validateRequest_1.default)(authValication_1.AuthValidation.loginZodSchema), signin_1.default);
router.post('/user/signup', (0, validateRequest_1.default)(authValication_1.AuthValidation.signupUserZodSchema), userSignup_1.default);
router.post('/signup', (0, validateRequest_1.default)(authValication_1.AuthValidation.signupZodSchema), (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN), signup_1.default);
router.get('/profile', (0, auth_1.default)(constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.USER), profile_1.default);
exports.default = router;
