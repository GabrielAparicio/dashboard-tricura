import {
  differenceInCalendarDays,
  isValid,
  parseISO,
  startOfDay,
  format,
} from 'date-fns';
import type { Policy, PolicyFormProps, PolicyPayload } from '../types';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function calculateRiskColor(risk: number) {
  if (risk >= 0.7) {
    return 'high';
  } else if (risk >= 0.4) {
    return 'medium';
  } else {
    return 'low';
  }
}

export function getDaysUntilRenewal(effectiveDate: Date | string): number {
  const parsedDate =
    typeof effectiveDate === 'string' ? parseISO(effectiveDate) : effectiveDate;

  if (!isValid(parsedDate)) {
    throw new Error('Invalid effective date provided');
  }

  return differenceInCalendarDays(
    startOfDay(parsedDate),
    startOfDay(new Date()),
  );
}

export function convertPolicyToFormValues(policy: Policy): PolicyFormProps {
  return {
    accountName: policy.account.name,
    region: policy.account.region,
    facilityCount: policy.account.facilityCount,
    effectiveDate: parseISO(policy.renewal.effectiveDate),
    daysUntilRenewal: policy.renewal.daysUntilRenewal,
    premium: policy.financials.premium,
    claimsTotal: policy.financials.claimsTotal,
    reimbursementRisk: policy.financials.reimbursementRisk,
    missingDocuments: policy.compliance.missingDocuments,
    expiredDocuments: policy.compliance.expiredDocuments,
    pendingReviews: policy.compliance.pendingReviews.map((review) => ({
      type: review.type,
      dueDate: parseISO(review.dueDate),
      severity: review.severity,
    })),
  };
}

export function convertFormValuesToPolicyPayload(
  values: PolicyFormProps,
): PolicyPayload {
  return {
    account: {
      name: values.accountName,
      region: values.region,
      facilityCount: values.facilityCount,
    },
    renewal: {
      effectiveDate: format(values.effectiveDate, 'yyyy-MM-dd'),
      daysUntilRenewal: values.daysUntilRenewal,
    },
    financials: {
      premium: values.premium,
      claimsTotal: values.claimsTotal,
      reimbursementRisk: values.reimbursementRisk,
    },
    compliance: {
      missingDocuments: values.missingDocuments,
      expiredDocuments: values.expiredDocuments,
      pendingReviews: values.pendingReviews.map((review) => ({
        type: review.type,
        dueDate: format(review.dueDate, 'yyyy-MM-dd'),
        severity: review.severity,
      })),
    },
  };
}
