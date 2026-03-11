export interface PaginationQuery {
  page?: string;
  pageSize?: string;
  search?: string;
}

export interface ActivityBody {
  code: string;
  displayTh: string;
  displayEn?: string;
}

export interface CreatePointRuleBody {
  activityID?: number;
  activityId?: number;
  point?: number;
  status?: boolean | string;
}

export interface UpdatePointRuleBody {
  id?: number | string;
  status?: boolean | string;
}

export type PrimitiveInput = string | number | boolean | undefined | null;
