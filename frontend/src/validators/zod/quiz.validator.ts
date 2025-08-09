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

export const CreateQuizQuestionSchema = z
    .object({
        text: z
            .string()
            .min(5, 'Question must be at least 5 symbols!')
            .max(50, 'Question cannot be longer than 50 symbols!'),
        timeLimit: z
            .number('Time limit must be a number!')
            .int('Time limit must be an integer!')
            .min(10, 'Minimal time limit is 10 seconds!')
            .max(60, 'Maximum time limit is 60 seconds!')
            .default(30),
        quizId: z
            .number({
                error: (iss) =>
                    iss.input === undefined
                        ? 'Quiz id must be provided!'
                        : 'Quiz must be an number!',
            })
            .int('Quiz id must be an integer')
            .positive('Integer must be positive!'),
        options: z
            .array(z.string().min(1, 'Options cannot be empty!'), {
                error: (iss) =>
                    iss.input === undefined
                        ? 'Options must be provided!'
                        : 'Options must be a list!',
            })
            .min(2, 'At least 2 options are required')
            .max(4, 'No more than 4 options allowed')
            .refine((opts) => new Set(opts).size === opts.length, {
                error: 'Options must be unique',
            }),
        correctOptions: z
            .array(
                z
                    .number('Correct option index must be a number!')
                    .int('Correct option index must be an integer!')
                    .nonnegative('Must be a positive integer'),
                {
                    error: (iss) =>
                        iss.input === undefined
                            ? 'Correct options must be provided!'
                            : 'Correct options must be a list!',
                },
            )
            .min(1, 'At least one correct option'),
    })
    .superRefine((data, ctx) => {
        const { options, correctOptions } = data;
        // Check that all correct option indices are valid
        for (const index of correctOptions) {
            if (index >= options.length) {
                ctx.addIssue({
                    path: ['correctOptions'],
                    code: 'custom',
                    message: `Correct option index ${index} is out of range for options`,
                });
            }
        }
    });

export type CreateQuizQuestionInput = z.infer<typeof CreateQuizQuestionSchema>;

// Schema for quiz question creation form
export const CreateQuizQuestionFormSchema = z.object({
    text: z
        .string()
        .min(5, 'Question must be at least 5 symbols!')
        .max(50, 'Question cannot be longer than 50 symbols!'),
    timeLimit: z.coerce
        .number<number>('Time limit must be a number!')
        .int('Time limit must be an integer!')
        .min(10, 'Minimal time limit is 10 seconds!')
        .max(60, 'Maximum time limit is 60 seconds!'),
    options: z
        .array(
            z.object({
                text: z.string().min(1, 'Option cannot be empty'),
                isCorrect: z.boolean(),
            }),
        )
        .min(2, 'At least 2 options are required')
        .max(4, 'No more than 4 options allowed')
        .refine((opts) => new Set(opts.map((o) => o.text)).size === opts.length, {
            message: 'Options must be unique',
        })
        .refine((opts) => opts.some((o) => o.isCorrect), {
            message: 'At least one correct answer required',
        }),
});
// 2) payload schema for backend (output) — transforms input -> backend payload
export const CreateQuizQuestionPayloadSchema = CreateQuizQuestionFormSchema.transform((data) => ({
    text: data.text,
    timeLimit: data.timeLimit,
    options: data.options.map((o) => o.text),
    correctOptions: data.options.map((o, i) => (o.isCorrect ? i : -1)).filter((i) => i !== -1),
}));
export type CreateQuizQuestionForm = z.infer<typeof CreateQuizQuestionFormSchema>;
export type CreateQuizQuestionPayload = z.infer<typeof CreateQuizQuestionPayloadSchema>;
