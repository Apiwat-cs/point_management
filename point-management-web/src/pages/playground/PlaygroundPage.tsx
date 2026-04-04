import { type FC } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Container,
  Typography,
} from "@mui/material";

// components
import { PlaygroundForm } from "@/components/playground/PlaygroundForm";

// hooks
import { usePlaygroundActions } from "@/hooks/playground/usePlaygroundActions";

const PlaygroundPage: FC = () => {
  const { state, actions } = usePlaygroundActions();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1E293B" }}>
          Playground
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          ทดสอบการทำงานของระบบคะแนนโดยการจำลองการส่ง Activity เข้ามายัง API
        </Typography>
      </Box>

      <PlaygroundForm
        formData={state.formData}
        selectedApiKey={state.selectedApiKey}
        apiKeys={state.apiKeys}
        activities={state.activities}
        loading={state.loading}
        dataLoading={state.dataLoading}
        onInputChange={actions.handleInputChange}
        onSelectChange={actions.handleSelectChange}
        onApiKeyChange={actions.setSelectedApiKey}
        onSubmit={actions.handleTrigger}
      />

      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={6000}
        onClose={actions.closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={actions.closeNotification}
          severity={state.snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PlaygroundPage;
