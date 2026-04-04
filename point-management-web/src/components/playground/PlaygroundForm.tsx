import { type FC } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import type { TriggerPointPayload, ApiKey, Activity } from "@/types/pms";

interface PlaygroundFormProps {
  formData: TriggerPointPayload;
  selectedApiKey: string;
  apiKeys: ApiKey[];
  activities: Activity[];
  loading: boolean;
  dataLoading: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSelectChange: (name: string, value: string) => void;
  onApiKeyChange: (value: string) => void;
  onSubmit: () => void;
}

export const PlaygroundForm: FC<PlaygroundFormProps> = ({
  formData,
  activities,
  loading,
  dataLoading,
  onInputChange,
  onSelectChange,
  onSubmit,
}) => {
  if (dataLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }}>กำลังโหลดข้อมูลพื้นฐาน...</Typography>
      </Box>
    );
  }

  return (
    <Card
      sx={{ maxWidth: 800, mx: "auto", mt: 2, borderRadius: 2, boxShadow: 3 }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Point Trigger Playground
        </Typography>

        <Stack spacing={3}>
          {/* User ID */}
          <TextField
            fullWidth
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={onInputChange}
            placeholder="เช่น USER001"
            required
            helperText="ID ของผู้ใช้ที่ต้องการให้คะแนน"
          />

          {/* Activity Selection */}
          <FormControl fullWidth required>
            <InputLabel id="activity-select-label">Activity Code</InputLabel>
            <Select
              labelId="activity-select-label"
              name="activityCode"
              value={formData.activityCode}
              label="Activity Code"
              onChange={(e) =>
                onSelectChange("activityCode", e.target.value as string)
              }
            >
              {activities.map((activity) => (
                <MenuItem key={activity.id} value={activity.code}>
                  {activity.displayTh} ({activity.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reference ID */}
          <TextField
            fullWidth
            label="Reference ID (Optional)"
            name="referenceId"
            value={formData.referenceId}
            onChange={onInputChange}
            placeholder="เช่น Order-12345"
            helperText="ไอดีอ้างอิงเพื่อป้องกันการให้คะแนนซ้ำ (Idempotency)"
          />

          {/* Metadata */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2">
                Metadata (JSON String or JSON Object)
              </Typography>
              <Tooltip title='ตัวอย่าง: {"amount": 100, "type": "bonus"}'>
                <IconButton size="small">
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField
              fullWidth
              name="metadata"
              value={
                typeof formData.metadata === "object"
                  ? JSON.stringify(formData.metadata)
                  : formData.metadata
              }
              onChange={onInputChange}
              multiline
              rows={4}
              placeholder='{"key": "value"}'
            />
          </Box>

          <Box sx={{ pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={onSubmit}
              disabled={loading || !formData.userId || !formData.activityCode}
              sx={{
                py: 1.5,
                fontWeight: 700,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Trigger Point"
              )}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
