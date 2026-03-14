import React, { useState } from "react";

// material-ui
import {
  Dialog,
  Button,
  Stack,
  Typography,
  DialogContent,
  Box,
  alpha,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Avatar,
} from "@mui/material";

// assets
import { Notification } from "iconsax-react";

// local types
import type { PointRule } from "./types";

interface PointRuleSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedRuleId: string) => void;
  onConfirmDeleteOnly?: () => void;
  rules: PointRule[];
  loading?: boolean;
  activityName?: string;
  isActive?: boolean;
  mode?: "edit" | "delete";
}

const PointRuleSelectionDialog: React.FC<PointRuleSelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
  onConfirmDeleteOnly,
  rules,
  loading,
  activityName,
  isActive,
  mode = "delete",
}) => {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState<string>("");

  React.useEffect(() => {
    if (open && rules.length > 0) {
      setSelectedId(rules[0].id);
    }
  }, [open, rules]);


  return (
    <Dialog open={open} onClose={onClose} keepMounted maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Stack alignItems="center" spacing={3} sx={{ py: { xs: 1, sm: 1.5 } }}>
          {/* Icon Section */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Outer Glow */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: alpha(
                  isActive ? "#FF4528" : theme.palette.primary.main,
                  0.05,
                ),
                zIndex: 0,
              }}
            />
            {/* Middle Ring */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: alpha(
                  isActive ? "#FF4528" : theme.palette.primary.main,
                  0.08,
                ),
                zIndex: 0,
              }}
            />
            <Avatar
              sx={{
                zIndex: 1,
                width: 56,
                height: 56,
                boxShadow: "none",
                bgcolor: isActive
                  ? alpha("#FF4528", 0.15)
                  : alpha(theme.palette.primary.main, 0.15),
                color: isActive ? "#FF4528" : theme.palette.primary.main,
              }}
            >
              <Notification variant="Bold" />
            </Avatar>
          </Box>

          {/* Content Section */}
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: isActive ? "#FF4528" : "#1E293B",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                lineHeight: 1.4,
              }}
            >
              {mode === "edit"
                ? "ยืนยันการแก้ไข"
                : isActive
                  ? "กติกานี้กำลังเปิดใช้งานอยู่"
                  : "ยืนยันการลบข้อมูล"}
            </Typography>
            <Typography
              align="center"
              sx={{
                color: "#64748B",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                px: { xs: 0, sm: 1 },
              }}
            >
              {isActive ? (
                "หากลบระบบจะไม่มีการให้คะแนนสำหรับกิจกรรมนี้"
              ) : (
                <>
                  กิจกรรม{" "}
                  <Box
                    component="span"
                    sx={{ color: "#1E293B", fontWeight: 700 }}
                  >
                    "{activityName}"
                  </Box>{" "}
                  ต้องมีคะแนนที่เปิดใช้งานไว้ 1 รายการ
                  กรุณาเลือกรายการที่จะใช้แทนกติกาเดิมครับ
                </>
              )}
            </Typography>
          </Stack>

          {/* Rules List Section */}
          <Box
            sx={{
              width: "100%",
              maxHeight: "240px",
              overflowY: "auto",
              px: 0.5,
            }}
          >
            <RadioGroup
              value={selectedId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedId(e.target.value)
              }
            >
              <Stack spacing={1}>
                {rules.map((rule) => (
                  <Paper
                    key={rule.id}
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      borderColor:
                        selectedId === rule.id ? "#1A69FF" : "#E2E8F0",
                      bgcolor:
                        selectedId === rule.id
                          ? alpha("#1A69FF", 0.04)
                          : "#fff",
                      "&:hover": {
                        borderColor: "#1A69FF",
                        bgcolor: alpha("#1A69FF", 0.02),
                      },
                    }}
                    onClick={() => setSelectedId(rule.id)}
                  >
                    <FormControlLabel
                      value={rule.id}
                      control={
                        <Radio size="small" checked={selectedId === rule.id} />
                      }
                      label={
                        <Box sx={{ ml: 0.5 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: "#1E293B" }}
                          >
                            {rule.point} คะแนน
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#64748B", fontSize: "0.7rem" }}
                          >
                            ID: {rule.id.slice(-8).toUpperCase()}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        width: "100%",
                        m: 0,
                        "& .MuiFormControlLabel-label": { width: "100%" },
                      }}
                    />
                  </Paper>
                ))}
              </Stack>
            </RadioGroup>
          </Box>

          {/* Consolidated Alert Section (Always visible) */}
          <Box
            sx={{
              width: "100%",
              bgcolor: alpha("#64748B", 0.04),
              p: 2,
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#64748B",
                display: "block",
                fontWeight: 500,
                fontSize: "0.75rem",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              💡 กติกาที่มีประวัติธุรกรรมแล้วจะไม่สามารถลบได้ หากลบไม่สำเร็จ
              กรุณาใช้การ "ปิดใช้งาน" แทน
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack spacing={2} sx={{ width: 1, pt: 1 }}>
            <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={onClose}
                disabled={loading}
                sx={{
                  color: "#64748B",
                  borderColor: "#E2E8F0",
                  borderRadius: "12px",
                  py: 1.25,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#F8FAFC", borderColor: "#94A3B8" },
                }}
              >
                ยกเลิก
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => selectedId && onSelect(selectedId)}
                disabled={!selectedId || loading}
                sx={{
                  background:
                    "linear-gradient(135deg, #1A69FF 0%, #0045CC 100%)",
                  color: "#fff",
                  borderRadius: "12px",
                  py: 1.25,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(26, 105, 255, 0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0056FF 0%, #0037A3 100%)",
                    boxShadow: "0 6px 16px rgba(26, 105, 255, 0.3)",
                  },
                }}
              >
                {loading
                  ? "กำลังบันทึก..."
                  : mode === "edit"
                    ? "ยืนยันและสลับคะแนน"
                    : "ลบและสลับคะแนน"}
              </Button>
            </Stack>

            {onConfirmDeleteOnly && !loading && (
              <Button
                fullWidth
                variant="text"
                onClick={onConfirmDeleteOnly}
                sx={{
                  color: alpha("#1E293B", 0.6),
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 0.5,
                  "&:hover": {
                    bgcolor: alpha("#64748B", 0.05),
                    color: "#EF4444",
                  },
                }}
              >
                ลบโดยไม่สลับคะแนน
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PointRuleSelectionDialog;
