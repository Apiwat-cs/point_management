import apiClient from './apiClient';
import type { ApiResponse, ListParams, ListResult, Activity } from '@/types/pms';
import { normalizeActivity } from './pmsNormalizer';
import { assertSuccess } from './pmsServiceUtils';



// ── Service ─────────────────────────────────────────────────────────────────
const activityService = {
  getActivities: async (params?: ListParams): Promise<ListResult<Activity>> => {
    const response = await apiClient.get<ApiResponse<Activity[]>>('/activity/list', { params });
    const payload = response?.payload || [];
    const total = response?.total ?? response?.totalCount ?? payload.length;
    return { data: payload.map(normalizeActivity), total };
  },

  getActivityDetail: async (id: string): Promise<Activity> => {
    const response = await apiClient.get<ApiResponse<Activity>>(`/activity/detail/${id}`);
    return normalizeActivity(response?.payload);
  },

  createActivity: async (data: Omit<Activity, 'id' | 'createDate'>): Promise<Activity> => {
    const response = await apiClient.post<ApiResponse<Activity>>('/activity/detail', data);
    assertSuccess(response, 'ไม่สามารถสร้าง Activity ได้');
    return normalizeActivity(response?.payload);
  },

  updateActivity: async (id: string, data: Partial<Activity>): Promise<Activity> => {
    const response = await apiClient.put<ApiResponse<Activity>>(`/activity/detail/${id}`, data);
    assertSuccess(response, 'ไม่สามารถแก้ไข Activity ได้');
    return normalizeActivity(response?.payload);
  },

  deleteActivity: async (id: string): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.delete<ApiResponse<unknown>>(`/activity/detail/${id}`);
    assertSuccess(response, 'ไม่สามารถลบ Activity ได้');
    return response;
  }
};

export default activityService;
