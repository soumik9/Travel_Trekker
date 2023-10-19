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
const roomSchema_1 = __importDefault(require("../../models/roomSchema"));
const hotelSchema_1 = __importDefault(require("../../models/hotelSchema"));
const createRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a user with the same email already exists
    const existingHotel = yield hotelSchema_1.default.findOne({ _id: req.body.hotel }).populate('rooms');
    if (!existingHotel) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No hotel with this name/id exists.');
    }
    // checking is room exists for hotel
    //@ts-ignore
    if (existingHotel.rooms.find((item) => parseInt(item.roomNumber) === parseInt(req.body.roomNumber))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Room number exists for this hotel already.');
    }
    const result = yield roomSchema_1.default.create(req.body);
    if (result._id) {
        yield hotelSchema_1.default.updateOne({ _id: req.body.hotel }, {
            $push: {
                rooms: result._id,
            },
        }, { new: true });
    }
    else {
        yield roomSchema_1.default.deleteOne({ _id: result._id });
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create hotel room.');
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Room created successfully!`,
    });
}));
exports.default = createRoom;
