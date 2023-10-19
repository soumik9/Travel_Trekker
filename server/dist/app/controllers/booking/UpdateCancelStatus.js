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
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
const UpdateCancelStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.bookingId;
    let body = req.body;
    const booking = yield bookingSchema_1.default.findById(bookingId);
    if (!booking)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is booking available!');
    if (booking.status === 'accept') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cant change on accept status!');
    }
    // updating status
    yield bookingSchema_1.default.findOneAndUpdate({ _id: bookingId }, {
        $set: {
            status: 'cancel'
        }
    }, { new: true, runValidators: true });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking status updated successfully!',
    });
}));
exports.default = UpdateCancelStatus;
