import { Box, Typography, Paper } from "@mui/material";

export default function PointRulePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          กติกาการให้แต้ม (Point Rule)
        </Typography>
        <Typography color="text.secondary">
          จัดการเงื่อนไขการแจกคะแนน
        </Typography>
      </Paper>
    </Box>
  );
}
