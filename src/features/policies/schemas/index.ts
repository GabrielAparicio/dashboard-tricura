import z from 'zod';
import { REGIONS, REVIEW_TYPES, SEVERITIES, RANGE_MAX } from '../constants';

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
  filtersModal: z.boolean().optional(),
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

export const filtersFormSchema = z
  .object({
    region: z.enum(REGIONS).optional(),
    effectiveDateRange: z.object({
      from: z.date().nullable().optional(),
      to: z.date().nullable().optional(),
    }),
    premiumRange: z.object({
      min: z.number().min(0).optional(),
      max: z.number().max(RANGE_MAX).optional(),
    }),
    claimsTotalRange: z.object({
      min: z.number().min(0).optional(),
      max: z.number().max(RANGE_MAX).optional(),
    }),
    reimbursementRiskRange: z.object({
      min: z.number().min(0).max(1).optional(),
      max: z.number().min(0).max(1).optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const validateRange = (
      range:
        | {
            min?: number;
            max?: number;
          }
        | undefined,
      path: string[],
    ) => {
      if (
        range?.min !== undefined &&
        range?.max !== undefined &&
        range.min > range.max
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Min cannot be greater than Max',
          path,
        });
      }
    };

    validateRange(data.premiumRange, ['premiumRange']);
    validateRange(data.claimsTotalRange, ['claimsTotalRange']);
    validateRange(data.reimbursementRiskRange, ['reimbursementRiskRange']);

    const from = data.effectiveDateRange?.from;
    const to = data.effectiveDateRange?.to;

    if (from && !to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To date is required when From date is provided',
        path: ['effectiveDateRange', 'to'],
      });
    }

    if (to && !from) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date is required when To date is provided',
        path: ['effectiveDateRange', 'from'],
      });
    }

    if (from && to && from > to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date cannot be after To date',
        path: ['effectiveDateRange'],
      });
    }
  });
