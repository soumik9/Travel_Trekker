import { z } from 'zod';

const createHotelZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        location: z.string({
            required_error: 'Location is required'
        }),
        rating: z.number({
            required_error: 'Rating is required'
        }),
    }),
});

const updateHotelZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }).optional(),
        location: z.string({
            required_error: 'Location is required'
        }).optional(),
        rating: z.number({
            required_error: 'Rating is required'
        }).optional(),
    }),
});

export const HotelValidation = {
    createHotelZodSchema,
    updateHotelZodSchema
};