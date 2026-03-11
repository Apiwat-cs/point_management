import { Box, Typography } from "@mui/material";

export default function PmsPageHeader({ title }: { title: string }) {
  return (
    <Box sx={{ p: { xs: 2.5, sm: 4 }, pb: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#1E293B", fontFamily: "Inter, sans-serif" }}
      >
        {title}
      </Typography>
    </Box>
  );
}
