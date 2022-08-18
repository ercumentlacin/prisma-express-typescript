import { z } from 'zod';

export const create = z.object({
    email: z.string({
        required_error: 'Email is required',
    }),

    password: z.string({
        required_error: 'Password is required',
    }),

    avatarUrl: z.string().nullable().optional(),

    name: z.string().nullable().optional(),
});
