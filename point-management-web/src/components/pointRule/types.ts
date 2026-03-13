import type { PointRule, PointRulePayload, ActivityOption } from '@/types/pms';
export type { PointRule, PointRulePayload, ActivityOption };

export interface PointRuleForm {
  activityId: string;
  pointToGive: number;
  status: 'active' | 'inactive';
}
export interface PointRuleDashboardProps {
  pointRules: PointRule[];
  onEdit: (rule: PointRule) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onStatusChange?: (id: string, status: 'active' | 'inactive') => void;
  onParamsChange?: (params: { search?: string; page?: number; pageSize?: number }) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  loading?: boolean;
  search?: string;
}

export interface PointRuleFormProps {
  onClose: () => void;
  onSubmit: (data: PointRulePayload) => void;
  initialData?: PointRule | null;
  activities: ActivityOption[];
}

export interface PointRuleDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  onConfirmWithSwap?: () => void;
  title?: string;
  warning?: string;
  showSwapOption?: boolean;
  swapTargetName?: string | number;
  loading?: boolean;
  isActive?: boolean;
}

export interface PointRuleConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title?: string; // This will be the activity name/code
  loading?: boolean;
  isBlocking?: boolean; // Keep for backward compatibility if needed, but we'll use 'mode'
  mode?: 'create' | 'activate' | 'auto-swap' | 'deactivate';
  activeRuleId?: string; // ID of the rule currently active (to be deactivated)
  autoSwapRuleName?: string; // Point value of the rule to be auto-activated
}
