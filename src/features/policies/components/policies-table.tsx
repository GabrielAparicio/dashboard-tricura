import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { usePoliciesQuery } from '../hooks/use-policies-query';
import { useTablePagination } from '../hooks/use-search-params';
import CreatePolicyModal from './create-policy-modal';
import PolicyRow from './policy-row';
import { startTransition } from 'react';

export default function PoliciesTable() {
  const {
    data: { data: policies, pagination },
  } = usePoliciesQuery();
  const { updateParams } = useTablePagination();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          borderColor: 'grey.300',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={10} />

                <TableCell>Account Name</TableCell>

                <TableCell
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'table-cell',
                    },
                  }}
                >
                  Region
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
                  Facilities
                </TableCell>

                <TableCell
                  sx={{
                    display: {
                      xs: 'none',
                      lg: 'table-cell',
                    },
                  }}
                >
                  Effective Date
                </TableCell>

                <TableCell align="right">Premium</TableCell>

                <TableCell
                  align="right"
                  sx={{
                    display: {
                      xs: 'none',
                      lg: 'table-cell',
                    },
                  }}
                >
                  Claims Total
                </TableCell>

                <TableCell>Risk</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {policies.length === 0 ? (
                <EmptyState />
              ) : (
                policies.map((policy) => (
                  <PolicyRow key={policy.id} policy={policy} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={pagination.page - 1}
          rowsPerPage={pagination.limit}
          count={pagination.total}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageChange={(_event, page) => {
            startTransition(() => {
              updateParams((previousParams) => {
                return {
                  ...previousParams,
                  page: page + 1,
                };
              });
            });
          }}
          onRowsPerPageChange={(event) => {
            startTransition(() => {
              updateParams((previousParams) => {
                return {
                  ...previousParams,
                  limit: Number(event.target.value),
                  page: 1,
                };
              });
            });
          }}
        />
      </Paper>

      <CreatePolicyModal />
    </>
  );
}

function EmptyState() {
  return (
    <TableRow>
      <TableCell
        colSpan={8}
        align="center"
        sx={{
          py: 10,
        }}
      >
        <Typography color="text.secondary">No policies found</Typography>
      </TableCell>
    </TableRow>
  );
}
