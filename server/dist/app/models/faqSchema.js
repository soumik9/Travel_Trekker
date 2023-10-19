"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: [true, 'Name field is required']
    },
    answer: {
        type: String,
        required: [true, 'Name field is required']
    },
}, { timestamps: true });
const FAQ = (0, mongoose_1.model)("Faq", faqSchema);
exports.default = FAQ;
