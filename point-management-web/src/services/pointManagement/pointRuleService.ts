import apiClient from './apiClient';
import type { ApiResponse, ListParams, ListResult, PointRule, PointRulePayload } from '@/types/pms';
import { normalizePointRule } from './pmsNormalizer';
import { assertSuccess } from './pmsServiceUtils';

// ── Service ─────────────────────────────────────────────────────────────────
const pointRuleService = {
  getRules: async (params?: ListParams): Promise<ListResult<PointRule>> => {
    const response = await apiClient.get<ApiResponse<PointRule[]>>('/pointRule/list', { params });
    const payload = response?.payload || [];
    const total = response?.total ?? response?.totalCount ?? payload.length;
    return { data: payload.map(normalizePointRule), total };
  },

  getRuleById: async (id: string): Promise<PointRule> => {
    const response = await apiClient.get<ApiResponse<PointRule>>(`/pointRule/detail/${id}`);
    return normalizePointRule(response?.payload);
  },

  createRule: async (data: PointRulePayload): Promise<PointRule> => {
    const response = await apiClient.post<ApiResponse<PointRule>>('/pointRule/detail', data);
    assertSuccess(response, 'ไม่สามารถสร้าง Point Rule ได้');
    return normalizePointRule(response?.payload);
  },

  updateRule: async (id: string, data: Partial<PointRulePayload>): Promise<PointRule> => {
    const response = await apiClient.put<ApiResponse<PointRule>>(`/pointRule/detail/${id}`, {
      pointRuleId: id,
      ...data
    });
    assertSuccess(response, 'ไม่สามารถแก้ไข Point Rule ได้');
    return normalizePointRule(response?.payload);
  },

  deleteRule: async (id: string): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.delete<ApiResponse<unknown>>(`/pointRule/detail/${id}`);
    assertSuccess(response, 'ไม่สามารถลบ Point Rule ได้');
    return response;
  }
};

export default pointRuleService;
