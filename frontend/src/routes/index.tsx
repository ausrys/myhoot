import { createBrowserRouter } from 'react-router';
import App from '../App';
import CreateQuizPage from '../pages/quiz/CreateQuizPage';
import AllQuizzesPage from '../pages/quiz/AllQuizzesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [],
    },
    {
        path: '/quizzes',
        Component: AllQuizzesPage,
        children: [
            {
                path: 'create',
                Component: CreateQuizPage,
            },
        ],
    },
]);
