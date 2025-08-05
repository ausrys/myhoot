import { ZodError } from 'zod';

export const formatZodErrors = (error: ZodError): Record<string, string> => {
    const formatted: Record<string, string> = {};
    for (const issue of error.issues) {
        const key = issue.path.join('');
        formatted[key] = issue.message;
    }

    return formatted;
};
