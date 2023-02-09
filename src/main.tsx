import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "App";
import Class from "routes/Class";
import Adventures from "routes/Class/Adventures";
import Adventure from "routes/Class/Adventures/Adventure";
import Board from "routes/Class/Board";
import Points from "routes/Class/Points";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import AdventuresSummary from "routes/Class/Adventures/GoalSelection/AdventuresSummary";
import "./index.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "cursos/:classId",
        element: <Class />,
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
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
