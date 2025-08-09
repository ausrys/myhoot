import { getAllQuizzes, getQuizInfo } from './quizAPI';

export const quizzesQueryKey = ['quizzes'];
export const quizInfoQueryKey = ['quizInfo'];
export const quizzesQueryOptions = () => ({
    queryKey: [quizzesQueryKey],
    queryFn: () => getAllQuizzes(),
});
export const quizInfoQueryOption = (id: string) => ({
    queryKey: [quizInfoQueryKey, id],
    queryFn: () => getQuizInfo(id),
});
