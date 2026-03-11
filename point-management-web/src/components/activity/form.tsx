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
  FormHelperText,
  Paper,
} from "@mui/material";

// local types
import type { Activity } from "./types";

interface ActivityFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Activity, "id" | "createDate">) => void;
  initialData?: Activity | null;
  existingCodes?: string[]; // New prop
}

interface ActivityFormInputs {
  code: string;
  displayTh: string;
  displayEn: string;
}

// ==============================|| VALIDATION SCHEMA ||============================== //

const validationSchema = Yup.object()
  .shape({
    code: Yup.string()
      .required("กรุณากรอกรหัสกิจกรรม")
      .test(
        "unique-code",
        "รหัสกิจกรรมนี้มีอยู่ในระบบแล้ว กรุณาใช้รหัสอื่น",
        function (value, context) {
          const { existingCodes, initialData } =
            (context.options as any).context || {};
          if (initialData || !existingCodes || !value) return true;
          return !existingCodes.includes(value.trim().toUpperCase());
        },
      ),
    displayTh: Yup.string().ensure(),
    displayEn: Yup.string().ensure(),
  })
  .test(
    "at-least-one",
    "กรุณากรอกชื่อกิจกรรมอย่างน้อย 1 ช่อง (ไทย หรือ อังกฤษ)",
    function (value) {
      const { displayTh, displayEn } = value;
      return !!(displayTh?.trim() || displayEn?.trim());
    },
  );

// ==============================|| ACTIVITY FORM ||============================== //

const ActivityForm: React.FC<ActivityFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  existingCodes = [],
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormInputs>({
    resolver: yupResolver(validationSchema),
    context: { existingCodes, initialData },
    mode: "onChange",
    defaultValues: {
      code: initialData?.code || "",
      displayTh:
        initialData?.displayTh === "-" ? "" : initialData?.displayTh || "",
      displayEn:
        initialData?.displayEn === "-" ? "" : initialData?.displayEn || "",
    },
  });

  // Fetch logic removed. existingCodes passed as prop.

  // Sync with initialData if it changes
  useEffect(() => {
    if (initialData) {
      reset({
        code: initialData.code || "",
        displayTh:
          initialData.displayTh === "-" ? "" : initialData.displayTh || "",
        displayEn:
          initialData.displayEn === "-" ? "" : initialData.displayEn || "",
      });
    }
  }, [initialData, reset]);

  const onInternalSubmit = (data: ActivityFormInputs) => {
    const formattedData: Omit<Activity, "id" | "createDate"> = {
      ...data,
      displayTh: data.displayTh.trim() || "-",
      displayEn: data.displayEn.trim() || "-",
    };
    onSubmit(formattedData);
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
              {initialData ? "แก้ไขกิจกรรม" : "สร้างกิจกรรมใหม่"}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.5, sm: 4 }, flexGrow: 1 }}>
          <form id="activity-form" onSubmit={handleSubmit(onInternalSubmit)}>
            <Stack spacing={4}>
              {/* Main Validation Message (at least one check) */}
              {errors.root?.message && (
                <FormHelperText
                  error
                  sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  * {errors.root.message}
                </FormHelperText>
              )}

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
                  Activity Code <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="เช่น LOGIN_PROMO"
                      error={!!errors.code}
                      helperText={errors.code?.message as React.ReactNode}
                      disabled={!!initialData}
                      autoFocus={!initialData}
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
                  Display Name (TH)
                </Typography>
                <Controller
                  name="displayTh"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="ชื่อเรียกภาษาไทย"
                      error={!!errors.displayTh}
                      helperText={errors.displayTh?.message as React.ReactNode}
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
                  Display Name (EN)
                </Typography>
                <Controller
                  name="displayEn"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="Display Name in English"
                      error={!!errors.displayEn}
                      helperText={errors.displayEn?.message as React.ReactNode}
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
            form="activity-form"
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

export default ActivityForm;
