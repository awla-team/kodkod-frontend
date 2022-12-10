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
import "./index.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <h1 className="text-center">Selecciona un curso</h1>
          </div>
        ),
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
