import z from 'zod';
import { REGIONS, REVIEW_TYPES, SEVERITIES } from '../constants';

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

export const pendingReviewSchema = z.object({
  type: z.enum(REVIEW_TYPES),
  dueDate: z.date(),
  severity: z.enum(SEVERITIES),
});

export const policyFormSchema = z.object({
  accountName: z.string().min(1, 'Account name is required'),
  region: z.enum(REGIONS),
  facilityCount: z.number().min(1, 'Facility count must be greater than 0'),
  effectiveDate: z.date(),
  daysUntilRenewal: z.number('Premium must be positive'),
  premium: z.number().min(0, 'Premium must be positive'),
  claimsTotal: z.number().min(0, 'Claims total must be positive'),
  reimbursementRisk: z.number().min(0).max(1),
  missingDocuments: z.number().min(0),
  expiredDocuments: z.number().min(0),
  pendingReviews: z.array(pendingReviewSchema),
});
