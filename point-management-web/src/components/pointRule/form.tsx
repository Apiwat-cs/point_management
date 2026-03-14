import React, { useEffect } from "react";

// third-party
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// material-ui
import {
  Button,
  TextField,
  Stack,
  Typography,
  Box,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";

// local types
import type { PointRule, PointRulePayload, ActivityOption } from "./types";

interface PointRuleFormProps {
  onClose: () => void;
  onSubmit: (data: PointRulePayload) => void;
  initialData?: PointRule | null;
  activities: ActivityOption[];
}

interface PointRuleFormInputs {
  activityId: string;
  point: number;
  status: "active" | "inactive";
}

// ==============================|| VALIDATION SCHEMA ||============================== //

const validationSchema = Yup.object().shape({
  activityId: Yup.string().required("กรุณาเลือกกิจกรรม"),
  point: Yup.number()
    .typeError("กรุณากรอกตัวเลข")
    .required("กรุณากรอกคะแนนที่จะให้"),
  status: Yup.string()
    .oneOf(["active", "inactive"])
    .required("กรุณาเลือกสถานะ"),
});

// ==============================|| POINT RULE FORM ||============================== //

const PointRuleForm: React.FC<PointRuleFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  activities,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PointRuleFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      activityId: initialData?.activityId || "",
      point: initialData?.point || 0,
      status: initialData?.status || "active",
    },
  });

  // Sync with initialData if it changes
  useEffect(() => {
    if (initialData) {
      reset({
        activityId: initialData.activityId,
        point: initialData.point,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const onInternalSubmit = (data: PointRuleFormInputs) => {
    onSubmit(data);
  };

  return (
    <Box sx={{ animation: "fadeIn 0.2s ease-in-out" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            p: { xs: 2.5, sm: 4 },
            bgcolor: "#fff",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1E293B",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {initialData ? "แก้ไข Point Rule" : "สร้าง Point Rule ใหม่"}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.5, sm: 4 }, flexGrow: 1 }}>
          <form id="point-rule-form" onSubmit={handleSubmit(onInternalSubmit)}>
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    color: "#64748B",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Activity <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
                <Controller
                  name="activityId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      size="small"
                      disabled={!!initialData}
                      error={!!errors.activityId}
                      helperText={errors.activityId?.message}
                    >
                      {activities.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.displayTh} ({option.code})
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    color: "#64748B",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Point <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
                <Controller
                  name="point"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="number"
                      disabled={!!initialData}
                      error={!!errors.point}
                      helperText={errors.point?.message}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    color: "#64748B",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Status
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value === "active"}
                          onChange={(e) =>
                            field.onChange(
                              e.target.checked ? "active" : "inactive",
                            )
                          }
                        />
                      }
                      label={field.value === "active" ? "Active" : "Inactive"}
                    />
                  )}
                />
              </Box>
            </Stack>
          </form>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, sm: 4 },
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "flex-end",
            gap: { xs: 1.5, sm: 2 },
            bgcolor: "#F8FAFC",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{ width: { xs: "100%", sm: "120px" } }}
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            form="point-rule-form"
            variant="contained"
            disabled={isSubmitting}
            sx={{ width: { xs: "100%", sm: "150px" } }}
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PointRuleForm;
