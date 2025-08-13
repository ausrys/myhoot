import { createBrowserRouter } from 'react-router';
import App from '../App';
import CreateQuizPage from '../pages/quiz/CreateQuizPage';
import AllQuizzesPage from '../pages/quiz/AllQuizzesPage';
import { allQuizzesLoader, getQuizInfoLoader } from '../features/quiz/loaders';
import QuizInfoPage from '../pages/quiz/QuizInfoPage';
import { queryClient } from '../queryClient';
import Layout from '../layouts/Layout';
export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
        path: '/',
        element: <App />,
    },
    {
        path: '/quizzes',
        Component: AllQuizzesPage,
        loader: allQuizzesLoader(queryClient),
    },
    {
        path: '/quizzes/create',
        Component: CreateQuizPage,
    },
    {
        path: '/quizzes/quiz/:id',
        loader: getQuizInfoLoader(queryClient),
        Component: QuizInfoPage,
    },
        ]
    }
    ,
    
]);
