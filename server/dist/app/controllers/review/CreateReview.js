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
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const reviewSchema_1 = __importDefault(require("../../models/reviewSchema"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
const CreateReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Check if a user with the same email already exists
    const existingBooking = yield reviewSchema_1.default.findOne({ name: req.body.booking });
    if (existingBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An review with this order already exists.');
    }
    const result = yield reviewSchema_1.default.create(Object.assign(Object.assign({}, req.body), { user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
    if (result._id) {
        yield userSchema_1.default.updateOne({ _id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            $push: {
                reviews: result._id,
            },
        }, { new: true });
        yield bookingSchema_1.default.updateOne({ _id: req.body.booking }, {
            $set: {
                isReviewed: true
            }
        }, { new: true });
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Review created successfully!`,
    });
}));
exports.default = CreateReview;
