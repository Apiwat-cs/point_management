import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PmsSidebar from "./sidebar";
const RootLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
      }}
    >
      <PmsSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
