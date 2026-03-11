import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/layout";
import { ActivityListPage, ActivityFormPage } from "./pages/activity";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Activity Routes */}
            <Route path="activity" element={<ActivityListPage />} />
            <Route path="activity/create" element={<ActivityFormPage />} />
            <Route path="activity/edit/:id" element={<ActivityFormPage />} />

            <Route
              path="*"
              element={<div style={{ padding: 24 }}>Page Not Found</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
