"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/duc8f3yvq/image/upload/v1697143683/download_vpdfwv.jpg'
    },
    location: {
        type: String,
        required: [true, 'Location field is required'],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    rooms: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Room"
        },
    ],
}, { timestamps: true });
const Hotel = (0, mongoose_1.model)("Hotel", hotelSchema);
exports.default = Hotel;
