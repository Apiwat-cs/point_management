import { lazy } from "react";
import { Navigate } from "react-router-dom";

// import { ActivityListPage, ActivityFormPage } from "@/pages/activity";
const ActivityListPage = lazy(() => import("@/pages/activity/list"));
const ActivityFormPage = lazy(
  () => import("@/pages/activity/ActivityFormPage"),
);

const PointRuleListPage = lazy(
  () => import("@/pages/pointRule/PointRuleListPage"),
);
const PointRuleFormPage = lazy(
  () => import("@/pages/pointRule/PointRuleFormPage"),
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
];
