import { Router } from 'express';
import { createQuiz } from '../controllers/quiz.controller';
import { validatePostData } from '../middeware/validateZodSchema';
import { SessionQuizIdSchema } from '../validators/session.validator';

const sessionRouter = Router();

sessionRouter.post('/create', validatePostData(SessionQuizIdSchema), createQuiz);

export default sessionRouter;
