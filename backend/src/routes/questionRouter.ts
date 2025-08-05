import { Router } from 'express';
import { validate } from '../middeware/validateZodSchema';
import { CreateQuestionSchema } from '../validators/question.validator';
import { createQuestion } from '../controllers/question.controller';

const questionRouter = Router();

questionRouter.post('/create', validate(CreateQuestionSchema), createQuestion);

export default questionRouter;
