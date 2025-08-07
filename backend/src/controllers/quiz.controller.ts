import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import { CreateQuizInput } from '../validators/quiz.validator';
import { Question, Option } from '../models';

export const createQuiz = async (req: Request<{}, {}, CreateQuizInput>, res: Response) => {
    try {
        const { title, description, isPublic } = req.body;
        const quiz = await Quiz.create({ title, description, isPublic });
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllQuizzes = async (_: Request, res: Response) => {
    try {
        const quizzes = await Quiz.findAll();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getQuizInfo = async (req: Request, res: Response) => {
    const quizId = req.params.id;
    try {
        const quiz = await Quiz.findByPk(quizId, {
            include: [
                {
                    model: Question,
                    as: 'questions',
                    include: [
                        {
                            model: Option,
                            as: 'options',
                        },
                    ],
                },
            ],
        });
        if (!quiz) return res.status(404).json({ error: 'Quiz does not exist' });
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
