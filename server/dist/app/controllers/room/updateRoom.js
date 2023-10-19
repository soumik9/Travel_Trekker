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
const roomSchema_1 = __importDefault(require("../../models/roomSchema"));
const hotelSchema_1 = __importDefault(require("../../models/hotelSchema"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const updateRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const roomId = req.params.roomId;
    let body = req.body;
    const room = yield roomSchema_1.default.findById(roomId);
    if (!room)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is room available!');
    // updating room
    const result = yield roomSchema_1.default.findOneAndUpdate({ _id: roomId }, {
        $set: body
    }, { new: true, runValidators: true });
    if (result) {
        if (((_a = room === null || room === void 0 ? void 0 : room.hotel) === null || _a === void 0 ? void 0 : _a.toString()) !== body.hotel) {
            const hotelId = room === null || room === void 0 ? void 0 : room.hotel;
            yield hotelSchema_1.default.updateOne({ _id: hotelId }, {
                $pull: { rooms: roomId }
            });
            yield hotelSchema_1.default.updateOne({ _id: body.hotel }, {
                $push: {
                    rooms: roomId,
                },
            }, { new: true });
        }
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room updated successfully!',
    });
}));
exports.default = updateRoom;
