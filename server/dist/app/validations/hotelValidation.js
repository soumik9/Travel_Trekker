"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelValidation = void 0;
const zod_1 = require("zod");
const createHotelZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }),
        location: zod_1.z.string({
            required_error: 'Location is required'
        }),
        rating: zod_1.z.number({
            required_error: 'Rating is required'
        }),
    }),
});
const updateHotelZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }).optional(),
        location: zod_1.z.string({
            required_error: 'Location is required'
        }).optional(),
        rating: zod_1.z.number({
            required_error: 'Rating is required'
        }).optional(),
    }),
});
exports.HotelValidation = {
    createHotelZodSchema,
    updateHotelZodSchema
};
