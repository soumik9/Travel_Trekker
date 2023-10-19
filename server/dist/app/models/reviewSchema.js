"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: [true, 'Review field is required']
    },
    booking: {
        type: mongoose_1.Types.ObjectId,
        ref: "Booking",
        required: [true, 'Booking id field is required']
    },
    room: {
        type: mongoose_1.Types.ObjectId,
        ref: "Room",
        required: [true, 'room id field is required']
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, 'User id field is required']
    },
}, { timestamps: true });
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
