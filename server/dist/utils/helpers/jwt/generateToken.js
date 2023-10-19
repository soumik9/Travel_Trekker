"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (data, isRemembered) => {
    const payload = { email: data.email, role: data.role, _id: data._id };
    const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: isRemembered ? '30d' : '1d' });
    return token;
};
