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
  Avatar,
} from "@mui/material";

// project-imports
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Slide } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

const PopupTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PmsDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  onConfirmWithSwap?: () => void; // Optional for Point Rule
  title?: string;
  warning?: string; // Custom warning for active items
  infoMessage?: string; // Custom info message at the bottom
  showSwapOption?: boolean;
  swapTargetName?: string;
  loading?: boolean;
  isActive?: boolean;
  itemName?: string; // e.g. "กิจกรรม" or "Point Rule"
}

const PmsDeleteDialog: React.FC<PmsDeleteDialogProps> = ({
  open,
  handleClose,
  onConfirm,
  onConfirmWithSwap,
  title,
  warning,
  infoMessage,
  showSwapOption,
  loading,
  isActive,
  itemName = "ข้อมูล",
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          p: { xs: 0, sm: 1 },
        },
      }}
    >
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                borderRadius: "50%",
                bgcolor: alpha("#FF4528", 0.05),
                zIndex: 0,
              }}
            />
            <Avatar
              sx={{
                width: 64,
                height: 64,
                zIndex: 1,
                boxShadow: "none",
                bgcolor: alpha("#FF4528", 0.15),
                color: "#FF4528",
              }}
            >
              <DeleteOutlineIcon fontSize="large" />
            </Avatar>
          </Box>

          <Stack spacing={isActive ? 2 : 1} sx={{ width: 1 }}>
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
              {isActive
                ? `${itemName}นี้กำลังเปิดใช้งานอยู่`
                : "ยืนยันการลบข้อมูล"}
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "#64748B",
                fontSize: "0.925rem",
                lineHeight: 1.6,
                px: { xs: 0, sm: 1 },
              }}
            >
              {warning ? (
                <>
                  {warning}
                  <Box component="div" sx={{ mt: 0.5 }}>
                    การดำเนินการนี้ไม่สามารถยกเลิกได้
                  </Box>
                </>
              ) : (
                <>
                  คุณแน่ใจหรือไม่ว่าต้องการลบ {itemName}
                  {title && (
                    <Box
                      component="span"
                      sx={{ fontWeight: 700, color: "#1E293B", mx: 0.5 }}
                    >
                      "{title}"
                    </Box>
                  )}
                  นี้? การดำเนินการนี้ไม่สามารถยกเลิกได้
                </>
              )}
            </Typography>
          </Stack>

          {/* Info Alert Section */}
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
              💡{" "}
              {infoMessage ||
                `${itemName}ที่มีประวัติธุรกรรมแล้วจะไม่สามารถลบได้ หากลบไม่สำเร็จ กรุณาใช้การ "ปิดใช้งาน" แทน`}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack spacing={2} sx={{ width: 1, pt: 1 }}>
            <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
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
                  py: 1.25,
                  "&:hover": { bgcolor: "#F8FAFC", borderColor: "#94A3B8" },
                }}
              >
                ยกเลิก
              </Button>

              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                autoFocus
                onClick={() =>
                  showSwapOption ? onConfirmWithSwap?.() : onConfirm()
                }
                sx={{
                  background:
                    "linear-gradient(135deg, #1A69FF 0%, #0045CC 100%)",
                  color: "#fff",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.25,
                  boxShadow: "0 4px 12px rgba(26, 105, 255, 0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0056FF 0%, #0037A3 100%)",
                    boxShadow: "0 6px 16px rgba(26, 105, 255, 0.3)",
                  },
                }}
              >
                {loading
                  ? "กำลังลบ..."
                  : showSwapOption
                    ? "ลบและสลับกติกา"
                    : "ตกลง"}
              </Button>
            </Stack>

            {showSwapOption && !loading && (
              <Button
                fullWidth
                variant="text"
                onClick={onConfirm}
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

export default PmsDeleteDialog;
