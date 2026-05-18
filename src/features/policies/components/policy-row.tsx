import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RiskBadge from './risk-badge';
import DetailedPolicySection from './detailed-policy-section';
import { formatCurrency, formatDate } from '../utils';
import { type PolicyItem } from '../types';
import { useExpandedPolicyID } from '../hooks/use-search-params';

interface PolicyRowProps {
  policy: PolicyItem;
}

export default function PolicyRow({ policy }: PolicyRowProps) {
  const { expandedPolicyID, updateParams } = useExpandedPolicyID();
  const expanded = policy.id === expandedPolicyID;

  const toggleExpanded = () => {
    updateParams((prev) => ({
      ...prev,
      expandedPolicyId: expanded ? undefined : policy.id,
    }));
  };

  return (
    <>
      <TableRow
        onClick={toggleExpanded}
        sx={{
          backgroundColor: expanded ? 'selected' : undefined,
          '&:hover': {
            backgroundColor: !expanded ? 'hovered' : undefined,
          },
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            aria-label={expanded ? 'Collapse row' : 'Expand row'}
          >
            {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>
              {policy.accountName}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {policy.id}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell
          sx={{
            display: {
              xs: 'none',
              md: 'table-cell',
            },
          }}
        >
          <Chip size="small" label={policy.region} variant="outlined" />
        </TableCell>

        <TableCell
          align="right"
          sx={{
            display: {
              xs: 'none',
              lg: 'table-cell',
            },
          }}
        >
          {policy.facilityCount}
        </TableCell>

        <TableCell
          sx={{
            display: {
              xs: 'none',
              lg: 'table-cell',
            },
          }}
        >
          {formatDate(policy.effectiveDate)}
        </TableCell>

        <TableCell align="right">{formatCurrency(policy.premium)}</TableCell>

        <TableCell
          align="right"
          sx={{
            display: {
              xs: 'none',
              lg: 'table-cell',
            },
          }}
        >
          {formatCurrency(policy.claimsTotal)}
        </TableCell>

        <TableCell>
          <RiskBadge value={policy.reimbursementRisk} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          colSpan={8}
          sx={{
            p: 0,
            borderBottom: expanded ? undefined : 'none',
          }}
        >
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <DetailedPolicySection policyId={policy.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
