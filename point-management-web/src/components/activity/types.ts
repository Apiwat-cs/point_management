import type { Activity } from "@/types/pms";
export type { Activity };

export interface ActivityDashboardProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onAdd?: () => void;
  search?: string;
  onParamsChange?: (params: {
    search?: string;
    page?: number;
    pageSize?: number;
  }) => void;
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export interface ActivityItemProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}
