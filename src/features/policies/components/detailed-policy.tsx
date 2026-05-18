import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { formatCurrency, formatDate, calculateRiskColor } from '../utils';
import InfoItem from './info-item';
import Reviews from './reviews';
import RiskBadge from './risk-badge';
import EditPolicyModal from './edit-policy-modal';
import usePolicyQuery from '../hooks/use-policy-query';
import { useEditModalState } from '../hooks/use-search-params';

interface DetailedPolicyProps {
  policyID: string;
}

export default function DetailedPolicy({ policyID }: DetailedPolicyProps) {
  const { data: policy } = usePolicyQuery(policyID);
  const { updateParams } = useEditModalState();

  function editHandler() {
    updateParams((previousParams) => {
      return { ...previousParams, editPolicyId: policyID };
    });
  }

  return (
    <>
      <Box
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: 'grey.100',
                display: { xs: 'none', lg: 'block' },
              }}
            />
          }
        >
          <Stack
            sx={{
              flex: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Renewal & Account
            </Typography>

            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              spacing={2}
              sx={{
                mt: 1.5,
              }}
            >
              <InfoItem
                label="Effective"
                value={formatDate(policy.renewal.effectiveDate)}
              />
              <InfoItem
                label="Days to Renewal"
                value={policy.renewal.daysUntilRenewal.toString()}
              />
            </Stack>

            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              spacing={2}
              sx={{
                mt: 1.5,
              }}
            >
              <InfoItem label="Region" value={policy.account.region} />
              <InfoItem
                label="Facilities"
                value={policy.account.facilityCount.toString()}
              />
            </Stack>
          </Stack>

          <Stack sx={{ flex: 1.1 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Financials
            </Typography>

            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              spacing={2}
              sx={{
                mt: 1.5,
              }}
            >
              <InfoItem
                label="Premium"
                value={formatCurrency(policy.financials.premium)}
                large
              />
              <InfoItem
                label="Claims"
                value={formatCurrency(policy.financials.claimsTotal)}
                large
              />
            </Stack>

            <Stack
              sx={{
                mt: 3,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Reimbursement risk
                </Typography>

                <RiskBadge value={policy.financials.reimbursementRisk} />
              </Stack>

              <LinearProgress
                variant="determinate"
                value={policy.financials.reimbursementRisk * 100}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: 'grey.100',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 999,
                    bgcolor: `${calculateRiskColor(policy.financials.reimbursementRisk)}.main`,
                  },
                }}
              />
            </Stack>
          </Stack>

          <Stack
            sx={{
              flex: 1.35,
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {`Compliance · ${policy.compliance.missingDocuments} Missing · ${policy.compliance.expiredDocuments} Expired`}
              </Typography>

              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  color: 'primary.main',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <Button onClick={editHandler}>Edit</Button>
              </Stack>
            </Stack>
            <Reviews reviewList={policy.compliance.pendingReviews} />
          </Stack>
        </Stack>
      </Box>

      <EditPolicyModal policy={policy} />
    </>
  );
}
