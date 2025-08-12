Create error bounding page
Create layout
crud in front
fix return types
export const quizzesQueryOptions = () => ({
    queryKey: [quizzesQueryKey],
    queryFn: () => getAllQuizzes(),
});

