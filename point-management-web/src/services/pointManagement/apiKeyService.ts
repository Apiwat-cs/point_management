import apiClient from "./apiClient";
import type { ApiResponse, ListParams, ListResult, ApiKey } from "@/types/pms";
import { assertSuccess } from "./pmsServiceUtils";

const apiKeyService = {
  getApiKeys: async (params?: ListParams): Promise<ListResult<ApiKey>> => {
    const response = await apiClient.get<ApiResponse<ApiKey[]>>(
      "/apiKey/list",
      {
        params,
      },
    );
    const payload = response?.payload || [];
    const total = response?.total ?? response?.totalCount ?? payload.length;
    // Note: We might need a normalizer if the API response fields differ from the ApiKey interface
    return { data: payload, total };
  },

  getApiKeyDetail: async (id: string): Promise<ApiKey> => {
    const response = await apiClient.get<ApiResponse<ApiKey>>(
      `/apiKey/detail/${id}`,
    );
    if (!response?.payload) throw new Error("API Key not found");
    return response.payload;
  },

  createApiKey: async (data: {
    systemName: string;
    environment: string;
    expiredAt: string;
  }): Promise<ApiKey & { fullKey: string }> => {
    const response = await apiClient.post<
      ApiResponse<ApiKey & { fullKey: string }>
    >("/apiKey/detail", data);
    assertSuccess(response, "ไม่สามารถสร้าง API Key ได้");
    if (!response?.payload) throw new Error("Failed to create API Key");
    return response.payload;
  },

  updateApiKey: async (
    id: string,
    isActive: boolean,
  ): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.put<ApiResponse<unknown>>(
      `/apiKey/detail/${id}`,
      { isActive },
    );
    assertSuccess(response, "ไม่สามารถแก้ไข API Key ได้");
    return response;
  },

  deleteApiKey: async (id: string): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.delete<ApiResponse<unknown>>(
      `/apiKey/detail/${id}`,
    );
    assertSuccess(response, "ไม่สามารถลบ API Key ได้");
    return response;
  },
};

export default apiKeyService;
