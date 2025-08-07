import { useLoaderData } from 'react-router';
import type { QuizFullInfo, QuizQuestion, QuizQuestionOption } from '../../types/quiz';

export default function QuizInfoPage() {
    const quiz: QuizFullInfo = useLoaderData();

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            {quiz.questions
                ? quiz.questions.map((q: QuizQuestion, i: number) => (
                      <div key={q.id} className="mb-6">
                          <p className="font-semibold mb-2">
                              {i + 1}. {q.text}
                          </p>
                          <ul className="ml-4 list-disc">
                              {q.options.map((opt: QuizQuestionOption) => (
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
    );
}
