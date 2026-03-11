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
import { ActivityForm } from "@/components/activity";
import PmsConfirmDialog from "@/components/common/confirmDialog";

// hooks
import { useActivityForm } from "@/hooks/activity/useActivityForm";

const ActivityFormPage: FC = () => {
  const { id } = useParams();
  const {
    activity,
    loading,
    error,
    isEdit,
    isSaving,
    snackbar,
    showConfirmDialog,
    existingCodes,

    handleSubmit,
    handleConfirmEdit,
    handleClose,
    handleCloseSnackbar,
    setShowConfirmDialog,
  } = useActivityForm(id);

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
          <ActivityForm
            onClose={handleClose}
            onSubmit={handleSubmit}
            initialData={isEdit ? activity : null}
            existingCodes={existingCodes}
          />
        </Box>

        <PmsConfirmDialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirmEdit}
          title="ยืนยันการแก้ไขกิจกรรม"
          message={
            <>
              คุณต้องการบันทึกการแก้ไขกิจกรรม{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#1E293B" }}>
                "{activity?.displayTh}"
              </Box>{" "}
              ใช่หรือไม่?
            </>
          }
          loading={isSaving}
          confirmLabel="ยืนยันการแก้ไข"
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

export default ActivityFormPage;
