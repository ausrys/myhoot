import { z } from 'zod';

export const SessionQuizIdSchema = z.object({
    quizId: z.coerce
        .number<number>('Must provide a correct id format: number')
        .int('Number must be an integer'),
});

export type QuizId = z.infer<typeof SessionQuizIdSchema>;
