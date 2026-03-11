import { query } from "@/databases/postgres";
import type {
  IPointJobData,
  IPointTransaction,
  ILeaderboardRow,
} from "@/types/point";

export const processPointActivity = async (data: IPointJobData) => {
  const { activityCode, userId, referenceId, metadata } = data;
  console.log(
    `[PointService] Processing activity: ${activityCode} for user: ${userId}`,
  );

  try {
    // Call Stored Procedure
    const { rows } = await query(
      "CALL sp_process_activity($1, $2, $3, $4, NULL)",
      [
        activityCode,
        userId,
        referenceId || null,
        metadata ? JSON.stringify(metadata) : null,
      ],
    );

    // Check result
    if (rows.length > 0 && rows[0].p_result) {
      console.log("[PointService] Result:", rows[0]);
    }

    console.log("[PointService] Processed successfully");
    return true;
  } catch (error) {
    console.error("[PointService] Error processing point activity:", error);
    throw error;
  }
};

export const getTransactionList = async (params: {
  page: number;
  pageSize: number;
  search?: string;
  userId?: string;
}): Promise<IPointTransaction[]> => {
  const { page, pageSize, search, userId } = params;
  try {
    const { rows } = await query(
      "SELECT * FROM sp_get_point_transaction_list($1, $2, $3, $4)",
      [page, pageSize, search || null, userId || null],
    );
    return rows as IPointTransaction[];
  } catch (error) {
    console.error("[PointService] Error fetching transaction list:", error);
    throw error;
  }
};

export const getTransactionById = async (
  id: string,
): Promise<IPointTransaction | null> => {
  try {
    const { rows } = await query(
      "SELECT * FROM sp_get_point_transaction_by_id($1)",
      [id],
    );
    return (rows[0] as IPointTransaction) || null;
  } catch (error) {
    console.error(
      `[PointService] Error fetching transaction detail for ${id}:`,
      error,
    );
    throw error;
  }
};

export const getLeaderboard = async (params: {
  type: string;
  limit: number;
  offset: number;
  targetDate: string | null;
}): Promise<ILeaderboardRow[]> => {
  const { type, limit, offset, targetDate } = params;
  try {
    // 4. Call SQL Function
    // Order must be exact: (type, limit, offset, target_date)
    const { rows } = await query(
      "SELECT * FROM sp_get_leaderboard($1, $2, $3, $4)",
      [type, limit, offset, targetDate],
    );
    return rows as ILeaderboardRow[];
  } catch (error) {
    console.error("[PointService] Error fetching leaderboard:", error);
    throw error;
  }
};
