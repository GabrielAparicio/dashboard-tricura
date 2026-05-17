import { z } from 'zod';
import { REGIONS } from '../../features/policies/constants';

export const paramsSchema = z.object({
  page: z.number().catch(1).default(1),
  limit: z.number().catch(20).default(20),
  search: z.string().optional(),
  region: z.enum(REGIONS).optional(),
  effectiveDateFrom: z.string().optional(),
  effectiveDateTo: z.string().optional(),
  reimbursementRiskMin: z.number().optional(),
  reimbursementRiskMax: z.number().optional(),
  premiumMin: z.number().optional(),
  premiumMax: z.number().optional(),
  claimsTotalMin: z.number().optional(),
  claimsTotalMax: z.number().optional(),
  expandedPolicyId: z.string().optional(),
  createModal: z.boolean().optional(),
  editPolicyId: z.string().optional(),
});
