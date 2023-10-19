"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomNumber: {
        type: String,
        required: [true, 'Room number field is required']
    },
    roomType: {
        type: String,
        required: [true, 'Room type field is required']
    },
    price: {
        type: Number,
        required: [true, 'price field is required']
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    hotel: {
        type: mongoose_1.Types.ObjectId,
        ref: "Hotel",
        required: [true, 'Hotel id field is required']
    },
}, { timestamps: true });
const Room = (0, mongoose_1.model)("Room", roomSchema);
exports.default = Room;
