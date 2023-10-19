import { z } from 'zod';
import { userRoles } from '../models/userSchema';

const loginZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

const signupZodSchema = z.object({
    body: z.object({
        password: z.string(
            {
                required_error: 'Password is required',
            }
        ),
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email(),
        image: z.string().optional(),
        role: z.enum([...userRoles] as [string, ...string[]]),
    }),
});

const signupUserZodSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: 'Password is required',
        }),
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email(),
        image: z.string().optional(),
    }),
});

const updateUserZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        name: z.string({
            required_error: 'Name is required',
        }).optional(),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email().optional(),
        image: z.string().optional(),
    }),
});

export const AuthValidation = {
    loginZodSchema,
    signupZodSchema,
    signupUserZodSchema,
    updateUserZodSchema
};