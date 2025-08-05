import { Request, Response } from 'express';
import { CreateQuestionInput } from '../validators/question.validator';
import { Question, Quiz, Option } from '../models';
export const createQuestion = async (req: Request<{}, {}, CreateQuestionInput>, res: Response) => {
    try {
        const { text, timeLimit, quizId, correctOptions, options } = req.body;
        // Check if quiz exists with provided quiz ID
        const quiz = await Quiz.findByPk(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        // Create a question and aquire question id for options
        const question = await Question.create({ text, timeLimit, quizId });
        // Insert options for a question
        const optionInstances = await Promise.all(
            options.map((optionText, idx) =>
                Option.create({
                    questionId: question.id,
                    text: optionText,
                    isCorrect: correctOptions.includes(idx),
                }),
            ),
        );
        return res.status(201).json({
            message: 'Question created successfully',
            question,
            options: optionInstances,
        });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
