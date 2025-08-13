import { Request, Response } from 'express';
import GameSession from '../models/GameSession';

export const createGameSession = async (
    req: Request<{}, {}, { quizId: number }>,
    res: Response,
) => {
    try {
        const { quizId } = req.body;
        const session = await GameSession.create({
            quizId,
            status: 'waiting',
            startTime: null,
            endTime: null,
        });

        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating game session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
