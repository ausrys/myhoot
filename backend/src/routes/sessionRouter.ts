import { Router } from 'express';
import { validatePostData } from '../middeware/validateZodSchema';
import { SessionQuizIdSchema } from '../validators/session.validator';
import { createGameSession } from '../controllers/game.controller';

const sessionRouter = Router();

sessionRouter.post('/create', validatePostData(SessionQuizIdSchema), createGameSession);

export default sessionRouter;
