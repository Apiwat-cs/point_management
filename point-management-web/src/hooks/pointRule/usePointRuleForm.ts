import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pointRuleService from "@/services/pointManagement/pointRuleService";
import activityService from "@/services/pointManagement/activityService";
import type { PointRule, PointRulePayload, Activity } from "@/types/pms";

export const usePointRuleForm = (id?: string) => {
  const navigate = useNavigate();
  const [pointRule, setPointRule] = useState<PointRule | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<PointRulePayload | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const isEdit = !!id;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load activities for selection
        const activitiesRes = await activityService.getActivities();
        setActivities(activitiesRes.data);

        if (isEdit && id) {
          const rule = await pointRuleService.getRuleById(id);
          setPointRule(rule);
        }
      } catch (err: any) {
        setError(err.message || "ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEdit]);

  const handleSubmit = (data: PointRulePayload) => {
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmEdit = async () => {
    if (!pendingData) return;
    try {
      setIsSaving(true);
      if (isEdit && id) {
        await pointRuleService.updateRule(id, pendingData);
      } else {
        await pointRuleService.createRule(pendingData);
      }
      setSnackbar({
        open: true,
        message: isEdit ? "แก้ไข Point Rule สำเร็จ" : "สร้าง Point Rule สำเร็จ",
        severity: "success",
      });
      setShowConfirmDialog(false);
      setTimeout(
        () =>
          navigate("/point-rule", {
            state: { message: "บันทึกเรียบร้อย", severity: "success" },
          }),
        1000,
      );
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "เกิดข้อผิดพลาดในการบันทึก",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => navigate("/point-rule");
  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return {
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
  };
};
