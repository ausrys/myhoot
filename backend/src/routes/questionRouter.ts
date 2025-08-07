import { Router } from 'express';
import { validatePostData } from '../middeware/validateZodSchema';
import { CreateQuestionSchema } from '../validators/question.validator';
import { createQuestion } from '../controllers/question.controller';

const questionRouter = Router();

questionRouter.post('/create', validatePostData(CreateQuestionSchema), createQuestion);

export default questionRouter;
