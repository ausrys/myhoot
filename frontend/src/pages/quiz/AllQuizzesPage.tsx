import { Link, useLoaderData } from 'react-router';
import type { allQuizzesLoader } from '../../features/quiz/loaders';
import { useQuery } from '@tanstack/react-query';
import { quizzesQueryOptions } from '../../features/quiz/queries';
import { useDeleteQuiz } from '../../features/quiz/mutations';

export default function AllQuizzesPage() {
    const initialData = useLoaderData() as Awaited<
            ReturnType<ReturnType<typeof allQuizzesLoader>>
        >;
    const { data: quizzes } = useQuery({
        ...quizzesQueryOptions(),
        initialData: initialData,
        staleTime: 1000 * 5,
    });
    if (quizzes.length === 0) return <p className="p-4">No quizzes found.</p>;
    const {mutate: deleteQuiz} = useDeleteQuiz()

    const handleDeleteClick = (id: number) => {
        deleteQuiz(id)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">All Quizzes</h1>
            <div className="grid gap-4 md:grid-cols-2">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="border p-4 rounded shadow hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold">{quiz.title}</h2>
                        <p className="text-sm text-gray-600">
                            {quiz.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Created at: {new Date(quiz.createdAt).toLocaleString()}
                        </p>
                        <Link
                            to={`/quizzes/quiz/${quiz.id}`}
                            className="inline-block mt-3 text-blue-600 hover:underline"
                        >
                            View Details
                        </Link>
                        <button className='bg-red-500 mx-6' onClick={() => handleDeleteClick(quiz.id)}> Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
