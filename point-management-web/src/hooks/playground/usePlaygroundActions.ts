import { useState, useCallback, useEffect } from "react";
import playgroundService from "@/services/pointManagement/playgroundService";
import apiKeyService from "@/services/pointManagement/apiKeyService";
import activityService from "@/services/pointManagement/activityService";
import type { TriggerPointPayload, ApiKey, Activity } from "@/types/pms";

export const usePlaygroundActions = () => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedApiKey, setSelectedApiKey] = useState<string>("");
  const [formData, setFormData] = useState<TriggerPointPayload>({
    activityCode: "",
    userId: "",
    referenceId: "",
    metadata: "",
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchData = useCallback(async () => {
    try {
      setDataLoading(true);
      
      // Fetch activities (Required)
      try {
        const activitiesRes = await activityService.getActivities({ limit: 100 });
        setActivities(activitiesRes.data);
      } catch (err: unknown) {
        console.error("Failed to load activities", err);
        throw new Error("ไม่สามารถโหลดข้อมูลกิจกรรมได้");
      }

      // Fetch API Keys (Optional - skip if error)
      try {
        const keysRes = await apiKeyService.getApiKeys({ limit: 100 });
        setApiKeys(keysRes.data);
      } catch (err: unknown) {
        console.warn("Failed to load API keys, skipping...", err);
        // We don't throw here to allow playground to work without API keys
      }

    } catch (err: unknown) {
      const error = err as Error;
      setSnackbar({
        open: true,
        message: "Failed to load master data: " + (error.message || ""),
        severity: "error",
      });
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrigger = async () => {
    if (!formData.activityCode || !formData.userId) {
      setSnackbar({
        open: true,
        message: "กรุณากรอกข้อมูล Activity Code และ User ID",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await playgroundService.triggerPoint(formData);
      setSnackbar({
        open: true,
        message: `Trigger สำเร็จ! Job ID: ${res.payload?.jobId || "N/A"}`,
        severity: "success",
      });
    } catch (err: unknown) {
      const error = err as Error;
      setSnackbar({
        open: true,
        message: "Trigger ล้มเหลว: " + (error.message || "Unknown error"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeNotification = () => setSnackbar({ ...snackbar, open: false });

  return {
    state: {
      loading,
      dataLoading,
      apiKeys,
      activities,
      formData,
      selectedApiKey,
      snackbar,
    },
    actions: {
      setFormData,
      setSelectedApiKey,
      handleInputChange,
      handleSelectChange,
      handleTrigger,
      closeNotification,
      fetchData,
    },
  };
};
