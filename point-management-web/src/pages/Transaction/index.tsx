import { Box, Typography, Paper } from "@mui/material";

export default function TransactionPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          รายการสะสมแต้ม (Transactions)
        </Typography>
        <Typography color="text.secondary">ประวัติการแจกและใช้คะแนน</Typography>
      </Paper>
    </Box>
  );
}
