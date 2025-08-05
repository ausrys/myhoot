import { Router } from 'express';
import quizRouter from './quizRouter';
import questionRouter from './questionRouter';

const router = Router();

router.use('/quiz', quizRouter);
router.use('/question', questionRouter);

export default router;
