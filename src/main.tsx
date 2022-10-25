import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import "./index.css";
import Adventures from "./routes/Adventures";
import Adventure from "./routes/Adventures/Adventure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "*",
        // TODO: create 404 view
        element: <h1>Esta pagina no existe papito</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
