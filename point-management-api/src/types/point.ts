export interface IPointJobData {
  activityCode: string;
  userId: string;
  referenceId?: string;
  metadata?: Record<string, unknown> | string;
}

export interface IPointTransaction {
  transaction_id: string;
  user_id: string;
  activity_id: number;
  display_name_th?: string;
  display_name_en?: string;
  rule_id?: number;
  points_received: number;
  reference_id?: string;
  metadata?: Record<string, unknown> | string;
  created_at: Date;
  total_count?: number;
}

export interface ILeaderboardRow {
  rank_number: string | number;
  user_id: string;
  score: string | number;
  last_active: Date | string;
}

export interface ILeaderboardResponse {
  rank: number;
  userId: string;
  score: number;
  lastActive: Date | string;
}
