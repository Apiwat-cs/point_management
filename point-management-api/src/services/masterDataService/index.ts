import { query } from "@/databases/postgres";

/* Activity CRUD */

export const getActivityList = async ({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search: string;
}) => {
  try {
    const { rows } = await query(
      "SELECT * FROM sp_get_activity_list($1, $2, $3)",
      [page, pageSize, search],
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getActivityById = async (id: string) => {
  try {
    const { rows } = await query("SELECT * FROM sp_get_activity_by_id($1)", [
      id,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createActivity = async (input: {
  code: string;
  displayTh: string;
  displayEn?: string;
}) => {
  try {
    const { code, displayTh, displayEn } = input;
    await query("CALL sp_create_activity($1, $2, $3, $4)", [
      code,
      displayTh,
      displayEn || "",
      null,
    ]);
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

export const updateActivity = async (input: {
  id: number;
  code: string;
  displayTh: string;
  displayEn?: string;
}) => {
  try {
    const { id, code, displayTh, displayEn } = input;
    await query("CALL sp_update_activity($1, $2, $3, $4, $5)", [
      id,
      code,
      displayTh,
      displayEn || "",
      null,
    ]);
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const deleteActivity = async (id: string) => {
  try {
    await query("CALL sp_delete_activity($1)", [id]);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Point Rule CRUD */

export const getPointRuleList = async ({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search: string;
}) => {
  try {
    const { rows } = await query(
      "SELECT * FROM sp_get_point_rule_list($1, $2, $3)",
      [page, pageSize, search],
    );
    return rows;
  } catch (error) {
    console.error("[PointRule] getPointRuleList error:", error);
    throw error;
  }
};

export const getPointRuleById = async (id: number) => {
  try {
    const { rows } = await query("SELECT * FROM sp_get_point_rule_by_id($1)", [
      id,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error("[PointRule] getPointRuleById error:", error);
    throw error;
  }
};

export const createPointRule = async (input: {
  activityId: number;
  point: number;
  isActive: boolean;
}) => {
  try {
    const { activityId, point, isActive } = input;

    const { rows } = await query(
      "CALL sp_create_point_rule($1, $2, $3, NULL)",
      [activityId, point, isActive],
    );
    const result = rows[0]?.p_result;
    if (result && result.toString().startsWith("Error:")) {
      throw new Error(result);
    }
    return result;
  } catch (error) {
    console.error("[PointRule] createPointRule error:", error);
    throw error;
  }
};

export const updatePointRule = async (input: {
  id: number;
  isActive: boolean;
}) => {
  try {
    const { id, isActive } = input;

    const { rows } = await query("CALL sp_update_point_rule($1, $2, NULL)", [
      id,
      isActive,
    ]);
    const result = rows[0]?.p_result;
    if (result && result !== "Success") throw new Error(result);
  } catch (error) {
    console.error("[PointRule] updatePointRule error:", error);
    throw error;
  }
};

export const deletePointRule = async (id: number) => {
  try {
    await query("CALL sp_delete_point_rule($1, NULL)", [id]);
    return true;
  } catch (error) {
    console.error("[PointRule] deletePointRule error:", error);
    throw error;
  }
};
