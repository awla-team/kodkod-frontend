import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthContextProvider from "contexts/AuthContext";
import SignIn from "./UserAuth/SignIn";
import SignUp from "./UserAuth/SignUp";
import Home from "./Home";
import ClassContextProvider from "./Class/Context";
import Class from "./Class";
import Board from "./Class/Board";
import Adventures from "./Class/Adventures";
import { Adventure } from "./Class/Adventures/Adventure";
import AdventuresSummary from "./Class/Adventures/GoalSelection/AdventuresSummary";
import Points from "./Class/Points";
import RewardsView from "components/RewardsView";
import App from "App";
import ForgotPassword from "./UserAuth/ForgotPassword";
import ResetPassword from "./UserAuth/ResetPassword";
import Error404 from "../components/Error404";
import Progress from "./Class/Progress";
import UserAuthLayout from "./UserAuth";

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
      {
        element: <UserAuthLayout />,
        children: [
          {
            path: "/signin",
            index: true,
            element: <SignIn />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password/:token",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/app",
        element: (
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        ),
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "cursos/:classId",
            element: (
              <ClassContextProvider>
                <Class />
              </ClassContextProvider>
            ),
            children: [
              {
                path: "tablero",
                element: <Board />,
              },
              {
                path: "aventuras",
                element: <Adventures />,
              },
              {
                path: "progreso",
                element: <Progress />,
              },
              {
                path: "aventuras/:adventureId",
                element: <Adventure />,
              },
              {
                path: "aventuras/summary",
                element: <AdventuresSummary />,
              },
              {
                path: "puntajes",
                element: <Points />,
              },
              {
                path: "aventuras/rewards",
                element: <RewardsView />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
