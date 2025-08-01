import { formatZodErrors } from '../utils/zodErrorFormatter';
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = formatZodErrors(result.error);
        return res.status(400).json(errors);
    }
    // Replace body with parsed data to ensure typesafety
    req.body = result.data;
    next();
};
