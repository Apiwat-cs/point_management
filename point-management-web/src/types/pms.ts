export interface BaseApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  errorCode?: string;
}

export interface ApiResponse<T> extends BaseApiResponse {
  payload?: T;
  data?: T;
  total?: number;
  totalCount?: number;
  status?: "success" | "failed" | "error";
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export interface ListResult<T> {
  data: T[];
  total: number;
}

export interface Activity {
  id: string;
  code: string;
  displayTh: string;
  displayEn: string;
  createDate?: string;
  createdAt?: string;
}

export interface ActivityOption {
  id: string;
  code: string;
  displayTh: string;
  displayEn: string;
}

export interface PointRule {
  id: string;
  activityId: string;
  activityCode: string;
  activityName: string;
  point: number;
  status: "active" | "inactive";
  createDate?: string;
  createdAt?: string;
}

export interface PointRulePayload {
  activityId: string;
  point: number;
  status: "active" | "inactive";
}

export interface PointTransaction {
  id: string;
  transactionId: string;
  userId: string;
  activityId: string;
  activityCode: string;
  activityName: string;
  activityNameEn: string;
  ruleId: string;
  point: number;
  referenceId: string;
  metadata: string;
  createDate?: string;
  createdAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  score: number;
  lastActive?: string;
  avatar?: string;
  displayName?: string;
}

export interface ApiKey {
  id: string;
  systemName: string;
  environment: string;
  salt: string;
  hashedKey: string;
  expiredAt: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TriggerPointPayload {
  activityCode: string;
  userId: string;
  referenceId?: string;
  metadata?: Record<string, any> | string;
}
