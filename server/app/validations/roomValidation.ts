import { z } from 'zod';

const createRoomZodSchema = z.object({
    body: z.object({
        roomNumber: z.string({
            required_error: 'Room number is required'
        }),
        roomType: z.string({
            required_error: 'Room type is required'
        }),
        price: z.number({
            required_error: 'Price is required'
        }),
    }),
});

const updateRoomZodSchema = z.object({
    body: z.object({
        roomNumber: z.string({
            required_error: 'Room number is required'
        }).optional(),
        roomType: z.string({
            required_error: 'Room type is required'
        }).optional(),
        price: z.number({
            required_error: 'Room type is required'
        }).optional(),
    }),
});

export const RoomValidation = {
    createRoomZodSchema,
    updateRoomZodSchema
};