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
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const config_1 = __importDefault(require("../../../utils/server/config"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const updateUserByAuthId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    let body = req.body;
    // checking is user available
    const user = yield userSchema_1.default.findOne({ _id: userId });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is user available!');
    // cut out some data which should not be updated
    let { password, email } = body, updatedData = __rest(body, ["password", "email"]);
    // if there is password and confirm password
    if (body.password && body.password !== 'undefined') {
        // converting to hash passowrd
        const hashedPassword = yield bcrypt_1.default.hash(body.password, Number(config_1.default.BYCRYPT_SALT_ROUND));
        updatedData = Object.assign(Object.assign({}, updatedData), { password: hashedPassword });
    }
    // updating user
    yield userSchema_1.default.findOneAndUpdate({ _id: userId }, {
        $set: updatedData
    }, { new: true, runValidators: true });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile updated successfully!',
    });
}));
exports.default = updateUserByAuthId;
