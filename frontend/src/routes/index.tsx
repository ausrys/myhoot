import { createBrowserRouter } from 'react-router';
import CreateQuizPage from '../pages/quiz/CreateQuizPage';
import AllQuizzesPage from '../pages/quiz/AllQuizzesPage';
import { allQuizzesLoader, getQuizInfoLoader } from '../features/quiz/loaders';
import QuizInfoPage from '../pages/quiz/QuizInfoPage';
import { queryClient } from '../queryClient';
import Layout from '../layouts/Layout';
import WaitingRoom from '../pages/session/WaitingRoomPage';
import Home from '../pages/Home';
import GamePage from '../pages/session/GamePage';
export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
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
        ],
    },
    {
        Component: WaitingRoom,
        path: '/game/waiting-room/:id',
    },
    {
        Component: GamePage,
        path: '/game/:id',
    },
    {
        Component: Home,
        path: '/',
    },
]);
