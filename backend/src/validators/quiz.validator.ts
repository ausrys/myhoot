import { z } from 'zod';

export const CreateQuizSchema = z.object({
    title: z
        .string({
            error: (iss) =>
                iss.input === undefined ? 'Title must be provided!' : 'Title must be a string',
        })
        .min(5, 'Title must be at least 5 symbols!')
        .max(30, 'Title cannot be longer than 30 symbols!'),
    description: z.string('Description must be a string!').optional(),
    isPublic: z.boolean('Must be a boolean!').optional().default(true),
});

export type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
