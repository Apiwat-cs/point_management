import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import activityService from "@/services/pointManagement/activityService";
import type { Activity } from "@/types/pms";

export const useActivityForm = (id?: string) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<Omit<
    Activity,
    "id" | "createDate"
  > | null>(null);
  const [existingCodes, setExistingCodes] = useState<string[]>([]);
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
    // Load existing codes to avoid duplicate
    activityService.getActivities().then((res) => {
      let codes = res.data.map((a) => a.code.toUpperCase());
      if (isEdit) {
        // Exclude current if editing
        activityService
          .getActivityDetail(id)
          .then((curr) => {
            setActivity(curr);
            codes = codes.filter((c) => c !== curr.code.toUpperCase());
            setExistingCodes(codes);
          })
          .catch((err) => {
            setError(err.message || "ไม่สามารถโหลดข้อมูลกิจกรรมนี้ได้");
          });
      } else {
        setExistingCodes(codes);
      }
    });
  }, [id, isEdit]);

  const handleSubmit = (data: Omit<Activity, "id" | "createDate">) => {
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmEdit = async () => {
    if (!pendingData) return;
    try {
      setIsSaving(true);
      if (isEdit) {
        await activityService.updateActivity(id, pendingData);
      } else {
        await activityService.createActivity(pendingData);
      }
      setSnackbar({
        open: true,
        message: isEdit ? "แก้ไขกิจกรรมสำเร็จ" : "สร้างกิจกรรมสำเร็จ",
        severity: "success",
      });
      setShowConfirmDialog(false);
      setTimeout(
        () =>
          navigate("/activity", {
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

  const handleClose = () => navigate("/activity");
  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return {
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
  };
};
