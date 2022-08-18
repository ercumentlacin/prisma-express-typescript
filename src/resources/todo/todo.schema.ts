import { z } from 'zod';

export const create = z.object({
    title: z
        .string({
            required_error: 'Title is required',
        })
        .min(3, {
            message: 'Title must be at least 3 characters',
        })
        .max(50, {
            message: 'Title must be at most 50 characters',
        }),

    content: z.string().nullable().optional(),

    completed: z.boolean().optional(),

    published: z.boolean().optional(),

    author: z.any(),
});
