import { type FC } from "react";
import { useParams } from "react-router-dom";

// material-ui
import {
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

// components
import { PointRuleForm } from "@/components/pointRule";
import PmsConfirmDialog from "@/components/common/confirmDialog";

// hooks
import { usePointRuleForm } from "@/hooks/pointRule/usePointRuleForm";

const PointRuleFormPage: FC = () => {
  const { id } = useParams();
  const {
    pointRule,
    activities,
    loading,
    error,
    isEdit,
    isSaving,
    snackbar,
    showConfirmDialog,

    handleSubmit,
    handleConfirmEdit,
    handleClose,
    handleCloseSnackbar,
    setShowConfirmDialog,
  } = usePointRuleForm(id);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h5">
          {error}
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Box
            component="button"
            onClick={handleClose}
            sx={{ cursor: "pointer", p: 1 }}
          >
            กลับสู่หน้าหลัก
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ p: 0 }}>
        <Box sx={{ width: "100%", mx: "auto" }}>
          <PointRuleForm
            onClose={handleClose}
            onSubmit={handleSubmit}
            initialData={isEdit ? pointRule : null}
            activities={activities}
          />
        </Box>

        <PmsConfirmDialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirmEdit}
          title={isEdit ? "ยืนยันการแก้ไข Point Rule" : "ยืนยันการสร้าง Point Rule"}
          message={
            <>
              คุณต้องการบันทึกข้อมูล Point Rule ของกิจกรรม{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
                "{activities.find(a => a.id === pointRule?.activityId)?.displayTh || pointRule?.activityName}"
              </Box>{" "}
              ใช่หรือไม่?
            </>
          }
          loading={isSaving}
          confirmLabel="ยืนยันบันทึก"
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PointRuleFormPage;
