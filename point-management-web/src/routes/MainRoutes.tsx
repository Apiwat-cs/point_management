import RootLayout from "@/components/layout/layout";
import { pmsRoutes } from "./pmsRoutes";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <RootLayout />,
  children: [
    ...pmsRoutes,
    {
      path: "*",
      element: <div style={{ padding: 24 }}>Page Not Found</div>,
    },
  ],
};

export default MainRoutes;
