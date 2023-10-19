"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidation = void 0;
const zod_1 = require("zod");
const createRoomZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string({
            required_error: 'Room number is required'
        }),
        roomType: zod_1.z.string({
            required_error: 'Room type is required'
        }),
        price: zod_1.z.number({
            required_error: 'Price is required'
        }),
    }),
});
const updateRoomZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string({
            required_error: 'Room number is required'
        }).optional(),
        roomType: zod_1.z.string({
            required_error: 'Room type is required'
        }).optional(),
        price: zod_1.z.number({
            required_error: 'Room type is required'
        }).optional(),
    }),
});
exports.RoomValidation = {
    createRoomZodSchema,
    updateRoomZodSchema
};
