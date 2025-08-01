import { Router } from 'express';
import quizRouter from './quizRouter';
const router = Router();
router.use('/quiz', quizRouter);
export default router;
