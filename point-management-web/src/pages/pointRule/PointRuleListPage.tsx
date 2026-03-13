import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Alert } from "@mui/material";
import { PointRuleDashboard } from "@/components/pointRule";
import PmsSnackbar from "@/components/common/snackbar";
import PmsPageHeader from "@/components/common/pageHeader";
import PmsDeleteDialog from "@/components/common/deleteDialog";
import { usePointRuleActions } from "@/hooks/pointRule/usePointRuleActions";

const PointRuleListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state, actions } = usePointRuleActions();
  const {
    pointRules,
    loading,
    error,
    deleteTargetRule,
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

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <PmsDeleteDialog
        open={!!deleteTargetRule}
        handleClose={() => actions.setDeleteTargetRule(null)}
        onConfirm={actions.handleConfirmDelete}
        title={`${deleteTargetRule?.activityName} (${deleteTargetRule?.point} pts)`}
        loading={isDeleting}
        itemName="Point Rule"
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
              <PmsPageHeader title="Point Rule Management" />
              <Box sx={{ p: { xs: 2, sm: 4 } }}>
                {error ? (
                  <Box sx={{ p: 5, textAlign: "center" }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                    <Button
                      variant="outlined"
                      onClick={() => actions.fetchPointRules()}
                    >
                      Try Again
                    </Button>
                  </Box>
                ) : (
                  <PointRuleDashboard
                    pointRules={pointRules}
                    onEdit={(r) => navigate(`/point-rule/edit/${r.id}`)}
                    onDelete={actions.handleDeleteRule}
                    onStatusChange={actions.handleStatusChange}
                    onAdd={() => navigate("/point-rule/create")}
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

export default PointRuleListPage;
