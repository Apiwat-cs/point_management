import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Alert } from "@mui/material";
import ActivityDashboard from "@/components/activity/dashboard";
import PmsSnackbar from "@/components/common/snackbar";
import PmsPageHeader from "@/components/common/pageHeader";
import PmsDeleteDialog from "@/components/common/deleteDialog";
import { useActivityActions } from "@/hooks/activity/useActivityActions";

const ActivityListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state, actions } = useActivityActions();
  const {
    activities,
    loading,
    error,
    deleteTargetActivity,
    isDeleting,
    snackbar,
    search,
    pagination,
    handleParamsChange,
  } = state;

  useEffect(() => {
    if (location.state?.message) {
      actions.setSnackbar({
        open: true,
        message: location.state.message,
        severity: location.state.severity || "success",
      });
      // Clear the state so it doesn't trigger again on re-renders
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (loading) return;
    if (!hasFetched.current) {
      hasFetched.current = true;
      return;
    }
  }, [loading]);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <PmsDeleteDialog
        open={!!deleteTargetActivity}
        handleClose={() => actions.setDeleteTargetActivity(null)}
        onConfirm={actions.handleConfirmDelete}
        title={deleteTargetActivity?.displayTh || deleteTargetActivity?.code}
        loading={isDeleting}
        itemName="กิจกรรม"
      />
      <Box sx={{ p: 0 }}>
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            minHeight: "100vh",
            borderRadius: 0,
            width: "100%",
            m: 0,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                border: "none",
                borderRadius: 0,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <PmsPageHeader title="Activity Management" />
              <Box sx={{ p: { xs: 2, sm: 4 } }}>
                {error ? (
                  <Box sx={{ p: 5, textAlign: "center" }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                    <Button
                      variant="outlined"
                      onClick={() => actions.fetchActivities()}
                    >
                      Try Again
                    </Button>
                  </Box>
                ) : (
                  <ActivityDashboard
                    activities={activities}
                    onEdit={(a) => navigate(`/activity/edit/${a.id}`)}
                    onDelete={actions.handleDeleteActivity}
                    onAdd={() => navigate("/activity/create")}
                    search={search}
                    onParamsChange={handleParamsChange}
                    pagination={pagination}
                    loading={loading}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <PmsSnackbar state={snackbar} onClose={actions.closeNotification} />
    </Box>
  );
};

export default ActivityListPage;
