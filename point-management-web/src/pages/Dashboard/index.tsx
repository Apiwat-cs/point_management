import { Box, Typography, Paper } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          แดชบอร์ด (Dashboard)
        </Typography>
        <Typography color="text.secondary">สรุปภาพรวมระบบจัดการแต้ม</Typography>
      </Paper>
    </Box>
  );
}
