import { Router } from 'express';
import quizRouter from './quizRouter';
import questionRouter from './questionRouter';
import sessionRouter from './sessionRouter';

const router = Router();

router.use('/quiz', quizRouter);
router.use('/question', questionRouter);
router.use('/session', sessionRouter);
export default router;
