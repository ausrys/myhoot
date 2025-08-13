import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuestion, deleteQuiz } from './quizAPI';
import type { Quiz, QuizFromBackend, QuizQuestionPayloadFull } from '../../types/quiz';
import { quizInfoQueryKey, quizzesQueryKey } from './queries';

export const useCreateQuizQuestion = (quizId: string) => {
    const queryClient = useQueryClient();
    // Create a question and edit cache so that the changes would be wisible emediately with out refething or refreshing page
    return useMutation({
        mutationFn: (question: QuizQuestionPayloadFull) => createQuestion(question),
        onSuccess: (data) => {
            queryClient.setQueryData(
                [quizInfoQueryKey, quizId],
                (oldQueryData: QuizFromBackend): QuizFromBackend => {
                    return {
                        ...oldQueryData,
                        questions: [...(oldQueryData?.questions ?? []), data.question],
                    };
                },
            );
            // We can refetch the data from the backend using invalidateQueries, which would refetch the data.
            // queryClient.invalidateQueries({ queryKey: [quizInfoQueryKey, quizId] });
        },
    });
};
export const useDeleteQuiz = () => {
    const queryClient = useQueryClient();
    // Create a question and edit cache so that the changes would be wisible emediately with out refething or refreshing page
    return useMutation({
        mutationFn: (id: number) => deleteQuiz(id),
        onSuccess: (_data, id) => {
            queryClient.setQueryData([quizzesQueryKey], (oldQueryData: Quiz[]): Quiz[] => {
                return oldQueryData.filter((quiz) => quiz.id != id);
            });
            // We can refetch the data from the backend using invalidateQueries, which would refetch the data.
            // queryClient.invalidateQueries({ queryKey: [quizzesQueryKey] });
        },
    });
};
