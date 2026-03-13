import React from "react";

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
  Avatar,
} from "@mui/material";

// assets
import { Notification } from "iconsax-react";

// local types
import type { PointRuleConfirmDialogProps } from "./types";

const PointRuleConfirmDialog: React.FC<PointRuleConfirmDialogProps> = ({
  open,
  handleClose,
  onConfirm,
  title,
  loading,
  isBlocking,
  mode,
  autoSwapRuleName,
}) => {
  const theme = useTheme();

  const getHeader = () => {
    if (isBlocking) return "ไม่สามารถสร้างคะแนนกิจกรรมซ้ำได้";
    if (mode === "deactivate") return "ยืนยันการปิดใช้งาน";
    if (mode === "create" || mode === "activate" || mode === "auto-swap")
      return "ยืนยันการเปลี่ยนกติกาคะแนน";
    return "ยืนยันการสร้างคะแนนกิจกรรม?";
  };

  const getMessage = () => {
    if (mode === "auto-swap") {
      return (
        <>
          กิจกรรม{" "}
          {title && (
            <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
              "{title}"
            </Box>
          )}
          <br />
          ต้องมีคะแนนที่เปิดใช้งานอย่างน้อย 1 รายการ
          <br />
          ระบบจะเปิดใช้งานคะแนนรายการอื่น (
          {autoSwapRuleName || "รายการที่มีอยู่"})
          <br />
          แทนรายการที่กำลังจะปิด คุณต้องการดำเนินการต่อหรือไม่?
        </>
      );
    }
    if (mode === "create") {
      return (
        <>
          กิจกรรม{" "}
          {title && (
            <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
              "{title}"
            </Box>
          )}
          <br />
          มีคะแนนที่เปิดใช้งานอยู่ในระบบแล้ว
          <br />
          หากยืนยัน ระบบจะเปลี่ยนไปใช้คะแนนใหม่นี้แทน
          <br />
          คุณต้องการดำเนินการต่อหรือไม่?
        </>
      );
    }
    if (mode === "activate") {
      return (
        <>
          คะแนนของ{" "}
          {title && (
            <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
              "{title}"
            </Box>
          )}
          <br />
          ที่กำลังใช้งานอยู่จะถูกปิดโดยอัตโนมัติ
          <br />
          เพื่อเปิดใช้งานคะแนนนี้แทน
          <br />
          คุณต้องการดำเนินการต่อหรือไม่?
        </>
      );
    }
    if (mode === "deactivate") {
      return (
        <Box sx={{ px: 1 }}>
          คุณต้องการดำเนินการต่อหรือไม่?
          <br />
          คะแนนของกิจกรรมนี้จะไม่สามารถใช้งานได้
        </Box>
      );
    }
    return (
      <Box sx={{ px: 1 }}>
        {isBlocking ? "กิจกรรม " : "ยืนยันการตั้งกติกาสำหรับ "}
        {title && (
          <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
            "{title}"
          </Box>
        )}
        <br />
        {isBlocking
          ? "มีคะแนนอยู่แล้วในระบบ กรุณาลบตัวคะแนนเดิมออกก่อน"
          : "ใช่หรือไม่? กติกาเดิมของกิจกรรมนี้จะถูกปิดลง"}
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} keepMounted maxWidth="xs">
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Stack alignItems="center" spacing={4} sx={{ py: { xs: 1, sm: 2 } }}>
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
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                borderRadius: "50%",
                bgcolor: isBlocking
                  ? alpha(theme.palette.error.main, 0.05)
                  : alpha(theme.palette.primary.main, 0.05),
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
                width: { xs: 75, sm: 90 },
                height: { xs: 75, sm: 90 },
                borderRadius: "50%",
                bgcolor: isBlocking
                  ? alpha(theme.palette.error.main, 0.08)
                  : alpha(theme.palette.primary.main, 0.08),
                zIndex: 0,
              }}
            />
            <Avatar
              sx={{
                zIndex: 1,
                width: 56,
                height: 56,
                boxShadow: "none",
                ...(isBlocking && {
                  bgcolor: alpha(theme.palette.error.main, 0.15),
                  color: theme.palette.error.main,
                }),
                ...(!isBlocking && {
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                }),
              }}
            >
              <Notification variant="Bold" />
            </Avatar>
          </Box>

          {/* Content Section */}
          <Stack spacing={1.5}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: "#1E293B",
                fontSize: { xs: "1.125rem", sm: "1.5rem" },
              }}
            >
              {getHeader()}
            </Typography>
            <Box
              sx={{
                color: "#64748B",
                fontSize: { xs: "0.875rem", sm: "0.925rem" },
                lineHeight: 1.6,
                px: { xs: 0, sm: 1 },
                textAlign: "center",
              }}
            >
              {getMessage()}
            </Box>
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={2}
            sx={{ width: 1, pt: 1 }}
          >
            <Button
              fullWidth
              onClick={handleClose}
              variant="outlined"
              disabled={loading}
              sx={{
                color: "#64748B",
                borderColor: "#E2E8F0",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                py: { xs: 1.5, sm: 1.25 },
                "&:hover": { bgcolor: "#F8FAFC", borderColor: "#94A3B8" },
              }}
            >
              ยกเลิก
            </Button>
            {!isBlocking && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => onConfirm()}
                autoFocus
                disabled={loading}
                sx={{
                  background:
                    "linear-gradient(135deg, #1A69FF 0%, #0045CC 100%)",
                  color: "#fff",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: { xs: 1.5, sm: 1.25 },
                  boxShadow: "0 4px 12px rgba(26, 105, 255, 0.25)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0056FF 0%, #0037A3 100%)",
                    boxShadow: "0 6px 16px rgba(26, 105, 255, 0.35)",
                  },
                }}
              >
                {loading ? "กำลังบันทึก..." : "ยืนยัน"}
              </Button>
            )}
            {isBlocking && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleClose}
                autoFocus
                sx={{
                  background: "#64748B",
                  color: "#fff",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: { xs: 1.5, sm: 1.25 },
                  "&:hover": { background: "#475569" },
                }}
              >
                ตกลง
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PointRuleConfirmDialog;
