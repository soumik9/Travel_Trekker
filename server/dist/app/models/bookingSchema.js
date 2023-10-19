"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, 'User id field is required']
    },
    room: {
        type: mongoose_1.Types.ObjectId,
        ref: "Room",
        required: [true, 'Room id field is required']
    },
    bookingStartDate: {
        type: String,
        required: [true, 'Start date field is required']
    },
    bookingEndDate: {
        type: String,
        required: [true, 'End Date field is required']
    },
    totalDays: {
        type: Number,
        required: [true, 'Total days field is required']
    },
    totalCost: {
        type: Number,
        required: [true, 'Total cost field is required']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'accept', 'reject', 'adjust', 'cancel'],
            message: `Role value can not be {VALUE}, must be accept/reject/adjust/cancel`
        },
        default: 'pending'
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
