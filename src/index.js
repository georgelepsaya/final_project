import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Todo from "./components/Todo/Todo";
import TableView from "./components/TableView/TableView";
import Grouped from "./components/Dashboard/Grouped/Grouped";
import Notes from "./components/Notes/Notes";
import CategoryNotes from "./components/Notes/CategoryNotes/CategoryNotes";
import SingleNote from "./components/Notes/SingleNote/SingleNote";
import ErrorPage from "./error-page";
import "./index.css";
import EditSingleNote from "./components/Notes/EditSingleNote/EditSingleNote";

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
            path: "todo",
            element: <Todo />,
          },
          {
            path: "task-board",
            element: <div>Task Board</div>,
          },
          {
            path: "table-view",
            element: <TableView />,
          },
          {
            path: "markdown",
            element: <Notes />,
            children: [
              {
                path: ":blockId",
                element: <CategoryNotes />,
              },
            ],
          },
          {
            path: "notes",
            element: <Outlet />,
            children: [
              {
                path: ":noteId",
                element: <SingleNote />,
              },
            ],
          },
          {
            path: "notes/:noteId/edit",
            element: <EditSingleNote />,
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
