import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/layout";

// Pages
import DashboardPage from "./pages/Dashboard";
import ActivityPage from "./pages/Activity";
import PointRulePage from "./pages/PointRule";
import TransactionPage from "./pages/Transaction";
import LeaderboardPage from "./pages/Leaderboard";
import ApiKeyPage from "./pages/ApiKey";

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
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="point-rule" element={<PointRulePage />} />
            <Route path="transaction" element={<TransactionPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="api-key" element={<ApiKeyPage />} />
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
