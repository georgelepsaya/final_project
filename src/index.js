import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Todo from "./components/Todo/Todo";
import TableView from "./components/TableView/TableView";
import Grouped from "./components/Dashboard/Grouped/Grouped";
import ErrorPage from "./error-page";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Grouped />,
          },
          {
            path: "/dashboard/todo",
            element: <Todo />,
          },
          {
            path: "/dashboard/task-board",
            element: <div>Task Board</div>,
          },
          {
            path: "/dashboard/table-view",
            element: <TableView />,
          },
          {
            path: "/dashboard/markdown",
            element: <div>Markdown</div>,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
