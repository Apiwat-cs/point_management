import { Box, Typography, Paper } from "@mui/material";

export default function LeaderboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          จัดอันดับคะแนน (Leaderboard)
        </Typography>
        <Typography color="text.secondary">
          ดูรายชื่อผู้ใช้งานที่มีคะแนนสะสมสูงสุด
        </Typography>
      </Paper>
    </Box>
  );
}
