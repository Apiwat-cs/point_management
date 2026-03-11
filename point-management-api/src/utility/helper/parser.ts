import type { PrimitiveInput } from '@/types/masterData';

export const parseBooleanStatus = (status: PrimitiveInput): boolean => {
  if (typeof status === 'boolean') return status;
  if (typeof status === 'string') {
    const lower = status.trim().toLowerCase();
    return lower === 'active' || lower === 'true';
  }
  return false;
};

export const parseNumber = (value: PrimitiveInput): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleanValue = value.trim();
    if (cleanValue === '') return 0;
    const num = Number(cleanValue);
    return Number.isNaN(num) ? 0 : num;
  }
  return 0;
};
