import { z } from 'zod';

export const CreateQuizSchema = z.object({
    title: z
        .string({
            error: (iss) =>
                iss.input === undefined ? 'Title must be provided!' : 'Title must be a string',
        })
        .min(5, 'Title must be at least 5 symbols!')
        .max(30, 'Title cannot be longer than 30 symbols!'),
    description: z
        .string('Description must be a string!')
        .max(100, 'Description cannot be longer than 100 symbols!')
        .optional(),
    isPublic: z.boolean('Must be a boolean!').optional().default(true),
});

export const QuizIdSchema = z.object({
    id: z.coerce
        .number<number>('Must provide a correct id format: number')
        .int('Number must be an integer'),
});

export type QuizId = z.infer<typeof QuizIdSchema>;

export type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
