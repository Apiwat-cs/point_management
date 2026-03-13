import { useState, useCallback, useEffect } from "react";
import pointRuleService from "@/services/pointManagement/pointRuleService";
import type { PointRule } from "@/types/pms";

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export const usePointRuleActions = () => {
  const [pointRules, setPointRules] = useState<PointRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTargetRule, setDeleteTargetRule] = useState<PointRule | null>(null);
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

  const fetchPointRules = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await pointRuleService.getRules(params);
      setPointRules(res.data);
      setPagination((prev) => ({
        ...prev,
        total: res.total || res.data.length,
        totalPages: Math.ceil((res.total || res.data.length) / prev.pageSize),
      }));
    } catch (err: any) {
      setError(err.message || "Failed to load point rules");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPointRules({
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

  const handleDeleteRule = (id: string) => {
    const rule = pointRules.find((r) => r.id === id);
    if (rule) {
      setDeleteTargetRule(rule);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetRule) return;
    try {
      setIsDeleting(true);
      await pointRuleService.deleteRule(deleteTargetRule.id);
      setSnackbar({
        open: true,
        message: "ลบ Point Rule เรียบร้อยแล้ว",
        severity: "success",
      });
      setDeleteTargetRule(null);
      fetchPointRules({
        search,
        page: pagination.page,
        limit: pagination.pageSize,
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "ไม่สามารถลบ Point Rule ได้",
        severity: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id: string, status: "active" | "inactive") => {
    try {
      setLoading(true);
      await pointRuleService.updateRule(id, { status } as any);
      setSnackbar({
        open: true,
        message: `เปลี่ยนสถานะเป็น ${status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"} เรียบร้อยแล้ว`,
        severity: "success",
      });
      fetchPointRules({
        search,
        page: pagination.page,
        limit: pagination.pageSize,
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "ไม่สามารถเปลี่ยนสถานะได้",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeNotification = () => setSnackbar({ ...snackbar, open: false });

  return {
    state: {
      pointRules,
      loading,
      error,
      deleteTargetRule,
      isDeleting,
      snackbar,
      search,
      pagination,
      handleParamsChange,
    },
    actions: {
      setDeleteTargetRule,
      handleConfirmDelete,
      handleDeleteRule,
      handleStatusChange,
      fetchPointRules,
      setSnackbar,
      closeNotification,
    },
  };
};
