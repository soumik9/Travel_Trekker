"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingSchema_1 = require("../models/bookingSchema");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string({
            required_error: 'Room id is required'
        }),
        bookingStartDate: zod_1.z.string({
            required_error: 'Booking start date is required'
        }),
        bookingEndDate: zod_1.z.string({
            required_error: 'Booking end date is required'
        }),
        totalDays: zod_1.z.number({
            required_error: 'Total days is required'
        }),
        totalCost: zod_1.z.number({
            required_error: 'Total cost is required'
        }),
        status: zod_1.z.enum([...bookingSchema_1.bookingStatuses]).optional(),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string({
            required_error: 'Room id is required'
        }).optional(),
        bookingStartDate: zod_1.z.string({
            required_error: 'Booking start date is required'
        }).optional(),
        bookingEndDate: zod_1.z.string({
            required_error: 'Booking end date is required'
        }).optional(),
        totalDays: zod_1.z.number({
            required_error: 'Total days is required'
        }).optional(),
        totalCost: zod_1.z.number({
            required_error: 'Total cost is required'
        }).optional(),
        status: zod_1.z.enum([...bookingSchema_1.bookingStatuses]).optional(),
    }),
});
const updateBookingStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...bookingSchema_1.bookingStatuses]),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
    updateBookingStatusZodSchema
};
