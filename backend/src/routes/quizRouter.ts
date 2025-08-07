import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizInfo } from '../controllers/quiz.controller';
import { validatePostData, validateParams } from '../middeware/validateZodSchema';
import { CreateQuizSchema, QuizIdSchema } from '../validators/quiz.validator';

const quizRouter = Router();

quizRouter.post('/create', validatePostData(CreateQuizSchema), createQuiz);
quizRouter.get('/all', getAllQuizzes);
quizRouter.get('/:id', validateParams(QuizIdSchema), getQuizInfo);

export default quizRouter;
