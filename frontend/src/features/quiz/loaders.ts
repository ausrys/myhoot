import type { QueryClient } from '@tanstack/react-query';
import { quizInfoQueryOption, quizzesQueryOptions } from './queries';
import type { LoaderFunctionArgs } from 'react-router';
import type { QuizFromBackend } from '../../types/quiz';

export const allQuizzesLoader = (queryClient: QueryClient) => async () => {
    const query = quizzesQueryOptions();
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
export const getQuizInfoLoader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs): Promise<QuizFromBackend> => {
        const id = params.id!;
        const query = quizInfoQueryOption(id);
        // ⬇️ return data or fetch it

        return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };
