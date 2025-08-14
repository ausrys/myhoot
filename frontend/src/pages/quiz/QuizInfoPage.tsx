import { useLoaderData, useNavigate, useParams } from 'react-router';
import AddQuestionForm from '../../features/quiz/QuizQuestionForm';
import { useQuery } from '@tanstack/react-query';
import { quizInfoQueryOption } from '../../features/quiz/queries';
import type { getQuizInfoLoader } from '../../features/quiz/loaders';
import { useCreateQuizSession } from '../../features/quiz/mutations';
export default function QuizInfoPage() {
    const initialData = useLoaderData() as Awaited<
        ReturnType<ReturnType<typeof getQuizInfoLoader>>
    >;
    const { id } = useParams<{ id: string }>();
    const { data: quiz } = useQuery({
        ...quizInfoQueryOption(id!),
        initialData: initialData,
        staleTime: 1000 * 5,
    });
    const navigate = useNavigate();
    const { mutate: createSession } = useCreateQuizSession();
    const handleCreateSession = () => {
        createSession(quiz.id, {
            onSuccess: (data) => {
                navigate(`/game/waiting-room/${data.id}`);
            },
        });
    };
    return (
        <div className="flex justify-center gap-x-28 p-6">
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
                {quiz.questions
                    ? quiz.questions.map((q, i: number) => (
                          <div key={q.id} className="mb-6">
                              <p className="font-semibold mb-2">
                                  {i + 1}. {q.text}
                              </p>
                              <ul className="ml-4 list-disc">
                                  {q.options.map((opt) => (
                                      <li
                                          className={opt.isCorrect ? 'bg-green-600' : undefined}
                                          key={opt.id}
                                      >
                                          {opt.text}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))
                    : null}
            </div>
            <div className="max-w-lg">
                <AddQuestionForm />
            </div>
            <div>
                <button onClick={() => handleCreateSession()}>Create Session</button>
            </div>
        </div>
    );
}
