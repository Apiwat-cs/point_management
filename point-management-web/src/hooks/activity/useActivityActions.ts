import { useState, useCallback, useEffect } from "react";
import activityService from "@/services/pointManagement/activityService";
import type { Activity } from "@/types/pms";

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export const useActivityActions = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTargetActivity, setDeleteTargetActivity] =
    useState<Activity | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchActivities = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await activityService.getActivities(params);
      setActivities(res.data);
      setPagination((prev) => ({
        ...prev,
        total: res.total || res.data.length,
        totalPages: Math.ceil((res.total || res.data.length) / prev.pageSize),
      }));
    } catch (err: any) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities({
      search,
      page: pagination.page,
      limit: pagination.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pagination.page, pagination.pageSize]);

  const handleParamsChange = (params: {
    search?: string;
    page?: number;
    pageSize?: number;
  }) => {
    if (params.search !== undefined) setSearch(params.search);
    if (params.page !== undefined)
      setPagination((p) => ({ ...p, page: params.page! }));
    if (params.pageSize !== undefined)
      setPagination((p) => ({ ...p, pageSize: params.pageSize! }));
  };

  const handleDeleteActivity = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (activity) {
      setDeleteTargetActivity(activity);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetActivity) return;
    try {
      setIsDeleting(true);
      await activityService.deleteActivity(deleteTargetActivity.id);
      setSnackbar({
        open: true,
        message: "ลบกิจกรรมเรียบร้อยแล้ว",
        severity: "success",
      });
      setDeleteTargetActivity(null);
      fetchActivities({
        search,
        page: pagination.page,
        limit: pagination.pageSize,
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "ไม่สามารถลบกิจกรรมได้",
        severity: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const closeNotification = () => setSnackbar({ ...snackbar, open: false });

  return {
    state: {
      activities,
      loading,
      error,
      deleteTargetActivity,
      isDeleting,
      snackbar,
      search,
      pagination,
      handleParamsChange,
    },
    actions: {
      setDeleteTargetActivity,
      handleConfirmDelete,
      handleDeleteActivity,
      fetchActivities,
      setSnackbar,
      closeNotification,
    },
  };
};
