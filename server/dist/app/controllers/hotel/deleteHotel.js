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
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const hotelSchema_1 = __importDefault(require("../../models/hotelSchema"));
const roomSchema_1 = __importDefault(require("../../models/roomSchema"));
const deleteHotel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelId;
    // checking is user available
    const hotel = yield hotelSchema_1.default.findOne({ _id: hotelId });
    if (!hotel)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is hotel available!');
    // deleting data
    const result = yield hotelSchema_1.default.deleteOne({ _id: hotelId });
    if (result) {
        yield roomSchema_1.default.deleteMany({ hotel: hotelId });
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Hotel deleted successfully!',
    });
}));
exports.default = deleteHotel;
