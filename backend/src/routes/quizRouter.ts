import { Router } from 'express';
import { createQuiz, getAllQuizzes } from '../controllers/quiz.controller';
import { validate } from '../middeware/validateZodSchema';
import { CreateQuizSchema } from '../validators/quiz.validator';

const quizRouter = Router();

quizRouter.post('/create', validate(CreateQuizSchema), createQuiz);
quizRouter.get('/all', getAllQuizzes);

export default quizRouter;
