import React from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
} from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import ThemeRoutes from "./routes";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <React.Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <ThemeRoutes />
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
