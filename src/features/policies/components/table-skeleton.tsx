import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

export default function TableSkeleton() {
  return (
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

              <TableCell>Premium</TableCell>

              <TableCell
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
            {generateSkeletonRow()}
            {generateSkeletonRow()}
            {generateSkeletonRow()}
            {generateSkeletonRow()}
            {generateSkeletonRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function generateSkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="circular" width={20} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rounded" width={80} height={20} sx={{ mb: '3px' }} />
        <Skeleton variant="rounded" width={40} height={20} />
      </TableCell>

      <TableCell
        sx={{
          display: {
            xs: 'none',
            md: 'table-cell',
          },
        }}
      >
        <Skeleton variant="rounded" width={60} height={20} />
      </TableCell>

      <TableCell
        sx={{
          display: {
            xs: 'none',
            lg: 'table-cell',
          },
        }}
      >
        <Skeleton variant="rounded" width={30} height={20} />
      </TableCell>

      <TableCell
        sx={{
          display: {
            xs: 'none',
            lg: 'table-cell',
          },
        }}
      >
        <Skeleton variant="rounded" width={70} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rounded" width={70} height={20} />
      </TableCell>

      <TableCell
        sx={{
          display: {
            xs: 'none',
            lg: 'table-cell',
          },
        }}
      >
        <Skeleton variant="rounded" width={70} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rounded" width={60} height={20} />
      </TableCell>
    </TableRow>
  );
}
