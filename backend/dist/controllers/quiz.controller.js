import Quiz from '../models/Quiz';
export const createQuiz = async (req, res) => {
    try {
        const { title, description, isPublic } = req.body;
        const quiz = await Quiz.create({ title, description, isPublic });
        res.status(201).json(quiz);
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getAllQuizzes = async (_, res) => {
    try {
        const quizzes = await Quiz.findAll();
        res.status(200).json(quizzes);
    }
    catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
