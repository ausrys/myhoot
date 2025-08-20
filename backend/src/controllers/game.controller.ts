import { Request, Response } from 'express';
import GameSession from '../models/GameSession';
import { Question, Quiz } from '../models';

export const createGameSession = async (
    req: Request<{}, {}, { quizId: number }>,
    res: Response,
) => {
    try {
        const { quizId } = req.body;
        const quizQuestions = await Question.findAll({ where: { quizId } });
        if (!quizQuestions) return res.status(404).json('Quiz doesnt exist');
        const session = await GameSession.create({
            quizId,
            status: 'waiting',
            startTime: null,
            endTime: null,
            currentQuestionIndex: 0,
            quizQuestionIds: quizQuestions.map((q) => q.id),
        });

        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating game session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
