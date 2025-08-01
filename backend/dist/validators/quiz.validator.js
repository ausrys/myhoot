import { z } from 'zod';
export const CreateQuizSchema = z.object({
    title: z
        .string('Title cannot have only numbers!')
        .min(5, 'Title is required')
        .max(30, 'Title cannot be longer than 30 symbols!'),
    description: z.string('Description cannot have only numbers!').optional(),
    isPublic: z.boolean('Must be a boolean!').optional().default(true),
});
