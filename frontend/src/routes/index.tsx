import { createBrowserRouter } from 'react-router';
import App from '../App';
import CreateQuizPage from '../pages/quiz/CreateQuizPage';
import AllQuizzesPage from '../pages/quiz/AllQuizzesPage';
import { allQuizzesLoader, getQuizInfoLoader } from '../features/quiz/loaders';
import QuizInfoPage from '../pages/quiz/QuizInfoPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/quizzes',
        Component: AllQuizzesPage,
        loader: allQuizzesLoader,
    },
    {
        path: '/quizzes/create',
        Component: CreateQuizPage,
    },
    {
        path: '/quizzes/quiz/:id',
        loader: getQuizInfoLoader,
        Component: QuizInfoPage,
    },
]);
