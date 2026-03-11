import { lazy } from "react";
import { Navigate } from "react-router-dom";

// import { ActivityListPage, ActivityFormPage } from "@/pages/activity";
const ActivityListPage = lazy(() => import("@/pages/activity/list"));
const ActivityFormPage = lazy(
  () => import("@/pages/activity/ActivityFormPage"),
);

export const pmsRoutes = [
  {
    index: true,
    element: <Navigate to="/activity" replace />,
  },
  {
    path: "activity",
    children: [
      {
        index: true,
        element: <ActivityListPage />,
      },
      {
        path: "create",
        element: <ActivityFormPage />,
      },
      {
        path: "edit/:id",
        element: <ActivityFormPage />,
      },
    ],
  },
];
