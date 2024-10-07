import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthContextProvider from 'contexts/AuthContext';
import SignIn from './UserAuth/SignIn';
import Home from './Home';
import ClassContextProvider from './Class/context';
import Class from './Class';
import Board from './Class/Board';
import Adventures from './Class/Adventures';
import { Adventure } from './Class/Adventures/Adventure';
import App from 'App';
import ForgotPassword from './UserAuth/ForgotPassword';
import ResetPassword from './UserAuth/ResetPassword';
import Error404 from '../components/Error404';
import Progress from './Class/Progress';
import UserAuthLayout from './UserAuth';
import { type FC } from 'react';
import GoalSelection from './Class/GoalSelection';
import GoalAdventures from './Class/GoalAdventures';
import CompletedAdventure from './Class/CompletedAdventure';
import Rewards from 'routes/Class/Rewards';
import VerifyEmail from './UserAuth/VerifyEmail';
import AllCompletedAdventures from './Class/AllCompletedAdventures';
import SubjectLayout from 'layouts/SubjectLayout';
import SubjectActivities from './Subjects/Activities/SubjectActivities';
import Students from './Subjects/Students';
import LessonReview from './Subjects/Activities/Lesson/LessonReview';

const MainRouterComponent: FC = () => {
  // const { pathname } = useLocation();
  // if (pathname === "/") {
  //   return <Navigate to={"/app"} />;
  // }
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <MainRouterComponent />
      </AuthContextProvider>
    ),
    children: [
      {
        path: '*',
        element: <Error404 />,
      },
      {
        element: <UserAuthLayout />,
        children: [
          {
            path: '/signin',
            index: true,
            element: <SignIn />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: '/reset-password/:token',
            element: <ResetPassword />,
          },
          {
            path: '/verify-email/:userId/:token',
            element: <VerifyEmail />,
          },
        ],
      },
      {
        path: '/app',
        element: <App />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: 'perfil',
          },
          {
            path: 'classroom/:classId',
            element: (
              <ClassContextProvider>
                <Class />
              </ClassContextProvider>
            ),
            children: [
              {
                path: '',
                element: <SubjectLayout />,
                children: [
                  {
                    path: 'lessons',
                    children: [
                      {
                        path: '',
                        element: <SubjectActivities />,
                      },
                      {
                        path: ':lessonId/review',
                        element: <LessonReview />,
                      },
                    ],
                  },
                  {
                    path: 'analysis',
                    element: <p>seguimiento</p>,
                  },
                  {
                    path: 'students',
                    element: <Students />,
                  },
                ],
              },
              {
                path: 'tablero',
                element: <Board />,
              },
              {
                path: 'progreso',
                element: <Progress />,
              },
              {
                path: 'aventuras',
                element: <Adventures />,
              },
              {
                path: 'aventuras/iniciar',
                element: <GoalSelection />,
              },
              {
                path: 'aventuras/completed',
                element: <AllCompletedAdventures />,
              },
              {
                path: 'aventuras/completed/:classHasAdventureId',
                element: <CompletedAdventure />,
              },
              {
                path: 'aventuras/iniciar/objetivo/:goalId',
                element: <GoalAdventures />,
              },
              {
                path: 'aventuras/:adventureId',
                element: <Adventure />,
              },
              {
                path: 'recompensas',
                element: <Rewards />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
