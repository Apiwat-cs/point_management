import { Navigate } from "react-router-dom";

import ActivityListPage from "@/pages/activity/list";
import ActivityFormPage from "@/pages/activity/ActivityFormPage";

import PointRuleListPage from "@/pages/pointRule/PointRuleListPage";
import PointRuleFormPage from "@/pages/pointRule/PointRuleFormPage";

import PlaygroundPage from "@/pages/playground/PlaygroundPage";

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
  {
    path: "point-rule",
    children: [
      {
        index: true,
        element: <PointRuleListPage />,
      },
      {
        path: "create",
        element: <PointRuleFormPage />,
      },
      {
        path: "edit/:id",
        element: <PointRuleFormPage />,
      },
    ],
  },
  {
    path: "playground",
    element: <PlaygroundPage />,
  },
];
