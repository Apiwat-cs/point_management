import { Snackbar, Alert } from "@mui/material";

export default function PmsSnackbar({
  state,
  onClose,
}: {
  state: any;
  onClose: () => void;
}) {
  return (
    <Snackbar
      open={state.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={state.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
