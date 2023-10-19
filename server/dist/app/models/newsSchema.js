"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        required: [true, 'Image field is required']
    },
    desc: {
        type: String,
        required: [true, 'Description field is required']
    }
}, { timestamps: true });
const News = (0, mongoose_1.model)("News", newsSchema);
exports.default = News;
