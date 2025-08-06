import axios from '../../services/axios';
import type { CreateQuizInput } from '../../validators/zod/quiz.validator';

export const createQuiz = async (quizData: CreateQuizInput) => {
    const res = await axios.post('/quiz/create', quizData);
    return res.data;
};
export const getAllQuizzes = async () => {
    const res = await axios.get('/quiz/all');
    return res.data;
};
