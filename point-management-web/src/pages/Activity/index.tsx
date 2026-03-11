import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import activityService from "@/services/pointManagement/activityService";
import type { Activity } from "@/types/pms";

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const result = await activityService.getActivities();
        setActivities(result.data);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        จัดการกิจกรรม (Activity)
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        รายการกิจกรรมสะสมแต้มทั้งหมดที่มีในระบบ
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="activity table">
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                รหัสกิจกรรม (Code)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                ชื่อกิจกรรม (TH)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                ชื่อกิจกรรม (EN)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>วันที่สร้าง</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : activities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  ไม่พบข้อมูลกิจกรรม
                </TableCell>
              </TableRow>
            ) : (
              activities.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.displayTh}</TableCell>
                  <TableCell>{row.displayEn}</TableCell>
                  <TableCell>
                    {row.createDate || row.createdAt || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
