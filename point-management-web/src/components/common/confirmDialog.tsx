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
} from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Slide, Avatar } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

const PopupTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PmsConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: "primary" | "error" | "warning" | "info" | "success";
}

const PmsConfirmDialog: React.FC<PmsConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
  confirmLabel = "ยืนยัน",
  cancelLabel = "ยกเลิก",
  color = "primary",
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      fullWidth
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
                bgcolor: alpha(theme.palette[color].main, 0.05),
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
                bgcolor: alpha(theme.palette[color].main, 0.08),
                zIndex: 0,
              }}
            />
            <Avatar
              sx={{
                width: 64,
                height: 64,
                zIndex: 1,
                boxShadow: "none",
                bgcolor: alpha(theme.palette[color].main, 0.15),
                color: theme.palette[color].main,
              }}
            >
              <NotificationsNoneOutlinedIcon fontSize="large" />
            </Avatar>
          </Box>

          {/* Content Section */}
          <Stack spacing={1.5} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: "#1E293B",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {title}
            </Typography>
            <Typography
              align="center"
              sx={{
                color: "#64748B",
                fontSize: { xs: "0.875rem", sm: "0.925rem" },
                lineHeight: 1.6,
                px: { xs: 0, sm: 1 },
              }}
            >
              {message}
            </Typography>
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={2}
            sx={{ width: 1, pt: 1 }}
          >
            <Button
              fullWidth
              onClick={onClose}
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
              {cancelLabel}
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={onConfirm}
              autoFocus
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #1A69FF 0%, #0045CC 100%)",
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
              {loading ? "กำลังบันทึก..." : confirmLabel}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PmsConfirmDialog;
