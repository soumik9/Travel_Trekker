import { z } from 'zod';
import { bookingStatuses } from '../models/bookingSchema';

const createBookingZodSchema = z.object({
    body: z.object({
        room: z.string({
            required_error: 'Room id is required'
        }),
        bookingStartDate: z.string({
            required_error: 'Booking start date is required'
        }),
        bookingEndDate: z.string({
            required_error: 'Booking end date is required'
        }),
        totalDays: z.number({
            required_error: 'Total days is required'
        }),
        totalCost: z.number({
            required_error: 'Total cost is required'
        }),
        status: z.enum([...bookingStatuses] as [string, ...string[]]),
    }),
});

const updateBookingZodSchema = z.object({
    body: z.object({
        room: z.string({
            required_error: 'Room id is required'
        }).optional(),
        bookingStartDate: z.string({
            required_error: 'Booking start date is required'
        }).optional(),
        bookingEndDate: z.string({
            required_error: 'Booking end date is required'
        }).optional(),
        totalDays: z.number({
            required_error: 'Total days is required'
        }).optional(),
        totalCost: z.number({
            required_error: 'Total cost is required'
        }).optional(),
        status: z.enum([...bookingStatuses] as [string, ...string[]]).optional(),
    }),
});

const updateBookingStatusZodSchema = z.object({
    body: z.object({
        status: z.enum([...bookingStatuses] as [string, ...string[]]),
    }),
});

export const BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
    updateBookingStatusZodSchema
};