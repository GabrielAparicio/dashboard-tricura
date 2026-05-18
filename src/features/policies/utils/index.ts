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
