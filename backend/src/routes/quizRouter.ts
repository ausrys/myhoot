import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizInfo, deleteQuiz } from '../controllers/quiz.controller';
import { validatePostData, validateParams } from '../middeware/validateZodSchema';
import { CreateQuizSchema, QuizIdSchema } from '../validators/quiz.validator';

const quizRouter = Router();

quizRouter.post('/create', validatePostData(CreateQuizSchema), createQuiz);
quizRouter.get('/all', getAllQuizzes);
quizRouter.get('/:id', validateParams(QuizIdSchema), getQuizInfo);
quizRouter.delete('/delete', validatePostData(QuizIdSchema), deleteQuiz);

export default quizRouter;
