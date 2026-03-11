import type { ApiResponse } from "@/types/pms";

export const assertSuccess = (
  response: ApiResponse<unknown>,
  fallbackMsg: string,
): void => {
  if (response?.status && response.status !== "success") {
    throw new Error(response.message || fallbackMsg);
  }
};
