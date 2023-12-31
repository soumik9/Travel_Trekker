"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const generateToken_1 = __importDefault(require("../../../utils/helpers/jwt/generateToken"));
// superadmin@example.com
// admin@example.com
const signin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking email and password given
    if (!req.body.email || !req.body.password)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Information mismatched!');
    // find user
    const user = yield userSchema_1.default.findOne({ email: req.body.email }).lean();
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Information mismatched!');
    // checking is valid password
    const isValidPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!isValidPassword)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Credential mismatch!');
    // token
    const token = (0, generateToken_1.default)(user, req.body.rememberMe);
    // user data
    const { password } = user, pwd = __rest(user, ["password"]);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Login Success!',
        data: {
            accessToken: token,
            user: pwd
        },
    });
}));
exports.default = signin;
