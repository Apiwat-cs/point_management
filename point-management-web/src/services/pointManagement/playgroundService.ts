import apiClient from "./apiClient";
import type { ApiResponse, TriggerPointPayload } from "@/types/pms";

const playgroundService = {
  triggerPoint: async (
    payload: TriggerPointPayload,
  ): Promise<ApiResponse<{ jobId: string }>> => {
    return apiClient.post<ApiResponse<{ jobId: string }>>(
      "/point/trigger",
      payload,
    );
  },
};

export default playgroundService;
