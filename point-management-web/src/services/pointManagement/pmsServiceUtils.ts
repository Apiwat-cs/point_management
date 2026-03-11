import type { ApiResponse } from '@/types/pms';

/**
 * Shared PMS service utilities
 * Centralizes common service-layer helpers used across all PMS services.
 */

/**
 * Asserts that an API response has status 'success'.
 * Throws an Error with the response message (or fallback) if not.
 *
 * Note: API responds with status:'success'/'failed'/'error' (NOT success:true/false)
 */
export const assertSuccess = (response: ApiResponse<unknown>, fallbackMsg: string): void => {
  if (response?.status && response.status !== 'success') {
    throw new Error(response.message || fallbackMsg);
  }
};
