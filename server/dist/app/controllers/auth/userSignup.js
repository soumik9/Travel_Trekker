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
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const constants_1 = require("../../../utils/constants/constants");
const userSignup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    const email = body.email;
    // Check if a user with the same email already exists
    const existingUser = yield userSchema_1.default.findOne({ email: email });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An account with this email already exists.');
    }
    // uploading file
    if (body.name) {
        body.image = `https://ui-avatars.com/api/?name=${body.name}`;
    }
    body.role = constants_1.ENUM_USER_ROLE.USER;
    yield userSchema_1.default.create(body);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `User (${body.name}) created successfully!`,
    });
}));
exports.default = userSignup;
