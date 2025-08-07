import { quizzesQueryOptions, quizInfoQueryOption } from './queries';
import { queryClient } from '../../queryClient';
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router';

export async function allQuizzesLoader() {
    return queryClient.ensureQueryData(quizzesQueryOptions());
}
export const getQuizInfoLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (id) return queryClient.ensureQueryData(quizInfoQueryOption(id));
    return;
};
