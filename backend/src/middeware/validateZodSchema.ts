import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { formatZodErrors } from '../utils/zodErrorFormatter';

export const validatePostData =
    (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = formatZodErrors(result.error);
            return res.status(400).json(errors);
        }

        // Replace body with parsed data to ensure typesafety
        req.body = result.data;
        next();
    };

export const validateParams =
    <T extends z.ZodType>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            const errors = formatZodErrors(result.error);
            return res.status(400).json(errors);
        }

        // Replace params with parsed data to ensure type safety
        (req.params as z.infer<T>) = result.data;
        next();
    };
