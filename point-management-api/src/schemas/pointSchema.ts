import { z } from 'zod';

export const triggerSchema = z.object({
  activityCode: z.string(),
  userId: z.string(),
  referenceId: z.string().optional(),
  metadata: z.union([z.record(z.string(), z.unknown()), z.string()]).optional(),
});
