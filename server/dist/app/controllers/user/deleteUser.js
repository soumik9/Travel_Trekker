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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // checking is user available
    const user = yield userSchema_1.default.findOne({ _id: userId });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is user available!');
    // if admin user delete request
    if (user.email === 'admin@gamil.com' || user.email === 'admin@example.com' || user.email === 'superadmin@gamil.com' || user.email === 'superadmin@example.com')
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Please contact admin to delete user!');
    // deleting data
    yield userSchema_1.default.deleteOne({ _id: userId });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully!',
    });
}));
exports.default = deleteUser;
