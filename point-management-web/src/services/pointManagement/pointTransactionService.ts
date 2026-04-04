import apiClient from "./apiClient";
import type {
  ApiResponse,
  ListParams,
  ListResult,
  PointTransaction,
} from "@/types/pms";
import { normalizePointTransaction } from "./pmsNormalizer";

const pointTransactionService = {
  getTransactions: async (
    params?: ListParams,
  ): Promise<ListResult<PointTransaction>> => {
    const { pageSize, ...rest } = params || {};
    const apiParams = {
      ...rest,
      limit: pageSize || rest.limit || 10,
    };

    const response = await apiClient.get<ApiResponse<any[]>>(
      "/point/transaction/list",
      {
        params: apiParams,
      },
    );

    const payload = response?.payload || response?.data || [];
    const total = response?.total ?? response?.totalCount ?? payload.length;

    const normalizedData = payload
      .map(normalizePointTransaction)
      .filter((item): item is PointTransaction => item !== null);

    return {
      data: normalizedData,
      total,
    };
  },
};

export default pointTransactionService;
