import axios from '../../services/axios';
import type { Quiz, QuizFromBackend, QuizQuestionPayloadFull } from '../../types/quiz';
import type { CreateQuizInput } from '../../validators/zod/quiz.validator';

export const createQuiz = async (quizData: CreateQuizInput) => {
    const res = await axios.post('/quiz/create', quizData);
    return res.data;
};
export const getAllQuizzes = async (): Promise<Quiz[]> => {
    const res = await axios.get('/quiz/all');
    return res.data;
};
export const getQuizInfo = async (id: string): Promise<QuizFromBackend> => {
    const res = await axios.get(`/quiz/${id}`);
    return res.data;
};

export const createQuestion = async (data: QuizQuestionPayloadFull) => {
    const res = await axios.post('/question/create', data);
    return res.data;
};
export const deleteQuiz = async (id: number) => {
    const res = await axios.delete('/quiz/delete', {
        data: { id },
    });
    return res.data;
};
