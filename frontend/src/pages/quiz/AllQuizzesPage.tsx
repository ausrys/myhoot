import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getAllQuizzes } from '../../features/quiz/quizAPI';

type Quiz = {
    id: number;
    title: string;
    description?: string;
    createdAt: string;
};

export default function AllQuizzesPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await getAllQuizzes();
                setQuizzes(res);
            } catch (err) {
                console.error('Failed to fetch quizzes', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) return <p className="p-4">Loading quizzes...</p>;

    if (quizzes.length === 0) return <p className="p-4">No quizzes found.</p>;

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
                            to={`/quiz/${quiz.id}`}
                            className="inline-block mt-3 text-blue-600 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
