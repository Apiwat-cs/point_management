import { Box, Typography, Paper } from "@mui/material";

export default function ApiKeyPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          จัดการ API Key
        </Typography>
        <Typography color="text.secondary">
          สร้างและกำหนดสิทธิ์ให้ลูกค้าภายนอกเรียกใช้งาน API
        </Typography>
      </Paper>
    </Box>
  );
}
