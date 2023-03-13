import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AuthContextProvider from "contexts/AuthContext";
import UserAuthLayout from "./UserAuth";
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

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: "*",
        element: <Navigate to="/signin" replace />,
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
