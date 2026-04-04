import { useState, useCallback, useEffect } from "react";
import pointTransactionService from "@/services/pointManagement/pointTransactionService";
import type { PointTransaction, ListParams } from "@/types/pms";

export const usePointTransactionActions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<ListParams & { pageSize: number }>({
    page: 1,
    pageSize: 10,
    search: "",
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await pointTransactionService.getTransactions(params);
      setTransactions(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newSize: number) => {
    setParams((prev) => ({ ...prev, pageSize: newSize, page: 1 }));
  };

  const handleSearchChange = (newSearch: string) => {
    setParams((prev) => ({ ...prev, search: newSearch, page: 1 }));
  };

  return {
    state: {
      loading,
      transactions,
      total,
      params,
    },
    actions: {
      fetchTransactions,
      handlePageChange,
      handleLimitChange,
      handleSearchChange,
    },
  };
};
