import { z } from 'zod';
import { REGIONS, REVIEW_TYPES, SEVERITIES } from '../constants';
import type {
  paramsSchema,
  policyFormSchema,
  pendingReviewSchema,
  filtersFormSchema,
} from '../schemas';

export interface Account {
  name: string;
  region: Region;
  facilityCount: number;
}

export interface RenewalInfo {
  effectiveDate: string;
  daysUntilRenewal: number;
}

export interface Review {
  type: ReviewType;
  dueDate: string;
  severity: SeverityType;
}

export interface ComplianceInfo {
  missingDocuments: number;
  expiredDocuments: number;
  pendingReviews: Review[];
}

export interface Financials {
  premium: number;
  claimsTotal: number;
  reimbursementRisk: number;
}

export interface Policy {
  id: string;
  account: Account;
  renewal: RenewalInfo;
  compliance: ComplianceInfo;
  financials: Financials;
}

export type PolicyPayload = Omit<Policy, 'id'>;

export interface PolicyItem {
  id: string;
  accountName: string;
  region: string;
  facilityCount: number;
  effectiveDate: string;
  premium: number;
  claimsTotal: number;
  reimbursementRisk: number;
}

export interface PoliciesResponse {
  data: PolicyItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type Region = (typeof REGIONS)[number];

export type ReviewType = (typeof REVIEW_TYPES)[number];

export type SeverityType = (typeof SEVERITIES)[number];

export type ParamsType = z.infer<typeof paramsSchema>;

export type PolicyFormProps = z.infer<typeof policyFormSchema>;

export type PendingReview = z.infer<typeof pendingReviewSchema>;

export type PolicyFormFilters = z.infer<typeof filtersFormSchema>;
