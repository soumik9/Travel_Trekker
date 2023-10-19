"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const userSchema_1 = require("../models/userSchema");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const signupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        image: zod_1.z.string().optional(),
        role: zod_1.z.enum([...userSchema_1.userRoles]),
    }),
});
const signupUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        image: zod_1.z.string().optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }).optional(),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    signupZodSchema,
    signupUserZodSchema,
    updateUserZodSchema
};
