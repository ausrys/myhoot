import axios from '../../services/axios';
import type { Quiz, QuizFullInfo } from '../../types/quiz';
import type { CreateQuizInput } from '../../validators/zod/quiz.validator';

export const createQuiz = async (quizData: CreateQuizInput) => {
    const res = await axios.post('/quiz/create', quizData);
    return res.data;
};
export const getAllQuizzes = async (): Promise<Quiz[]> => {
    const res = await axios.get('/quiz/all');
    return res.data;
};
export const getQuizInfo = async (id: string): Promise<QuizFullInfo> => {
    const res = await axios.get(`/quiz/${id}`);
    return res.data;
};
