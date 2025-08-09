import { z } from 'zod';

export const CreateQuestionSchema = z
    .object({
        text: z
            .string({
                error: (iss) =>
                    iss.input === undefined
                        ? 'Question must be provided!'
                        : 'Question must be a string',
            })
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
        // Check that number of correct options isn't more than number of options
        if (correctOptions.length > options.length) {
            ctx.addIssue({
                path: ['correctOptions'],
                code: 'custom',
                message: 'Number of correct options cannot exceed total number of options',
            });
        }
        // Check for duplicates in correctOptions
        if (new Set(correctOptions).size !== correctOptions.length) {
            ctx.addIssue({
                path: ['correctOptions'],
                code: 'custom',
                message: 'Correct options must be unique',
            });
        }
    });

export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;
