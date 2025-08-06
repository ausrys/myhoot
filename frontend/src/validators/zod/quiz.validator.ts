import { z } from 'zod';

export const CreateQuizSchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 symbols!')
        .max(30, 'Title cannot be longer than 30 symbols!'),
    description: z
        .string('Description must be a string!')
        .max(100, 'Description cannot be longer than 100 symbols!')
        .optional(),
});

export type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
