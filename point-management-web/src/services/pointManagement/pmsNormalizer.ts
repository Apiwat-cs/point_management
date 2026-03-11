import { z } from "zod";
import { getValueByKeys } from "@/utils/normalizer";

// project-imports
import type {
  Activity,
  PointRule,
  PointTransaction,
  LeaderboardEntry,
} from "@/types/pms";

// ==============================|| ACTIVITY ||============================== //

export const ActivitySchema = z.object({
  id: z.string().default(""),
  code: z.string().default(""),
  displayTh: z.string().default(""),
  displayEn: z.string().default(""),
  createDate: z.string().default(""),
  createdAt: z.string().optional(),
});

export const normalizeActivity = (data: unknown): Activity => {
  if (!data || typeof data !== "object") return ActivitySchema.parse({});
  return ActivitySchema.parse({
    id: String(
      getValueByKeys(
        data,
        ["activity_id", "activityId", "activityID", "id"],
        "",
      ),
    ),
    code: getValueByKeys(data, ["code", "activity_code", "activityCode"], ""),
    displayTh: getValueByKeys(
      data,
      ["display_th", "displayTh", "display_name_th", "displayNameTh"],
      "",
    ),
    displayEn: getValueByKeys(
      data,
      ["display_en", "displayEn", "display_name_en", "displayNameEn"],
      "",
    ),
    createDate: getValueByKeys(
      data,
      ["create_date", "createDate", "createdAt", "created_at"],
      "",
    ),
    createdAt: getValueByKeys(
      data,
      ["createdAt", "created_at", "create_date", "createDate"],
      undefined,
    ),
  }) as Activity;
};

// ==============================|| POINT RULE ||============================== //

export const PointRuleSchema = z.object({
  id: z.string().default(""),
  activityId: z.string().default(""),
  activityCode: z.string().default(""),
  activityName: z.string().default(""),
  point: z.number().default(0),
  status: z.enum(["active", "inactive"]).default("inactive"),
  createDate: z.string().optional(),
  createdAt: z.string().optional(),
});

const resolveStatus = (data: object): "active" | "inactive" => {
  const raw = getValueByKeys<string | boolean>(
    data,
    ["status", "is_active", "isActive"],
    "",
  );
  return raw === "active" || raw === true || raw === "Active"
    ? "active"
    : "inactive";
};

export const normalizePointRule = (data: unknown): PointRule => {
  if (!data || typeof data !== "object") return PointRuleSchema.parse({});
  return PointRuleSchema.parse({
    id: String(
      getValueByKeys(
        data,
        ["point_rule_id", "pointRuleId", "pointRuleID", "id"],
        "",
      ),
    ),
    activityId: String(
      getValueByKeys(data, ["activity_id", "activityId", "activityID"], ""),
    ),
    activityCode: getValueByKeys(
      data,
      ["activity_code", "activityCode", "code"],
      "",
    ),
    activityName: getValueByKeys(
      data,
      ["activity_name", "activityName", "display_name_th", "displayNameTh"],
      "",
    ),
    point: Number(
      getValueByKeys(data, ["point", "point_to_give", "points"], 0),
    ),
    status: resolveStatus(data),
    createDate: getValueByKeys(
      data,
      ["create_date", "createDate", "createdAt", "created_at"],
      undefined,
    ),
    createdAt: getValueByKeys(
      data,
      ["createdAt", "created_at", "create_date", "createDate"],
      undefined,
    ),
  }) as PointRule;
};

// ==============================|| POINT TRANSACTION ||============================== //

export const PointTransactionSchema = z.object({
  id: z.string().default(""),
  transactionId: z.string().default(""),
  userId: z.string().default(""),
  activityId: z.string().default(""),
  activityCode: z.string().default(""),
  activityName: z.string().default(""),
  activityNameEn: z.string().default(""),
  ruleId: z.string().default(""),
  point: z.number().default(0),
  referenceId: z.string().default(""),
  metadata: z.string().default(""),
  createDate: z.string().default(""),
  createdAt: z.string().optional(),
});

const serializeMetadata = (data: object): string => {
  const meta = getValueByKeys(data, ["metadata", "meta_data", "details"], "");
  if (typeof meta === "object" && meta !== null)
    return JSON.stringify(meta, null, 2);
  return String(meta || "");
};

export const normalizePointTransaction = (
  data: unknown,
): PointTransaction | null => {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0)
    return null;
  return PointTransactionSchema.parse({
    id: String(
      getValueByKeys(
        data,
        [
          "point_transaction_id",
          "pointTransactionId",
          "pointTransactionID",
          "id",
        ],
        "",
      ),
    ),
    transactionId: getValueByKeys(
      data,
      [
        "transaction_id",
        "transactionId",
        "point_transaction_id",
        "pointTransactionId",
      ],
      "",
    ),
    userId: getValueByKeys(data, ["user_id", "userId", "user_id_ref"], ""),
    activityId: String(
      getValueByKeys(data, ["activity_id", "activityId", "activityID"], ""),
    ),
    activityCode: getValueByKeys(
      data,
      ["activity_code", "activityCode", "code"],
      "",
    ),
    activityName: getValueByKeys(
      data,
      [
        "activity_name",
        "activityName",
        "display_name_th",
        "displayNameTh",
        "display_th",
        "displayTh",
        "name_th",
        "nameTh",
        "activity_display_th",
        "display_name",
        "displayName",
        "name",
      ],
      "",
    ),
    activityNameEn: getValueByKeys(
      data,
      [
        "activity_name_en",
        "activityNameEn",
        "display_name_en",
        "displayNameEn",
        "display_en",
        "displayEn",
        "name_en",
        "nameEn",
        "activity_display_en",
      ],
      "",
    ),
    ruleId: String(
      getValueByKeys(
        data,
        ["point_rule_id", "pointRuleId", "ruleId", "rule_id"],
        "",
      ),
    ),
    point: Number(
      getValueByKeys(
        data,
        ["point", "points_received", "pointsReceived", "point_to_give"],
        0,
      ),
    ),
    referenceId: getValueByKeys(
      data,
      ["reference_id", "referenceId", "ref_id"],
      "",
    ),
    metadata: serializeMetadata(data),
    createDate: getValueByKeys(
      data,
      ["create_date", "createDate", "createdAt", "created_at"],
      "",
    ),
    createdAt: getValueByKeys(
      data,
      ["createdAt", "created_at", "create_date", "createDate"],
      undefined,
    ),
  }) as PointTransaction;
};

// ==============================|| LEADERBOARD ||============================== //

export const LeaderboardEntrySchema = z.object({
  rank: z.number().default(0),
  userId: z.string().default(""),
  score: z.number().default(0),
  lastActive: z.string().optional(),
  avatar: z.string().optional(),
  displayName: z.string().optional(),
});

export const normalizeLeaderboardEntry = (
  data: unknown,
  index: number,
): LeaderboardEntry => {
  if (!data || typeof data !== "object")
    return LeaderboardEntrySchema.parse({});
  return LeaderboardEntrySchema.parse({
    rank: Number(
      getValueByKeys(data, ["rank", "ranking", "position"], index + 1),
    ),
    userId: getValueByKeys(data, ["user_id", "userId", "user_id_ref"], ""),
    score: Number(
      getValueByKeys(
        data,
        ["score", "points", "total_points", "totalPoints"],
        0,
      ),
    ),
    lastActive: getValueByKeys(data, ["lastActive", "last_active"], undefined),
    avatar: getValueByKeys(
      data,
      ["avatar", "profile_image", "profile_picture"],
      undefined,
    ),
    displayName: getValueByKeys(
      data,
      ["display_name", "displayName", "name"],
      undefined,
    ),
  }) as LeaderboardEntry;
};
