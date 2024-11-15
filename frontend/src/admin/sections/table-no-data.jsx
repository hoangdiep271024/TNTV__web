import { Box, TableCell, TableRow, Typography } from "@mui/material";

export function TableNoData({ searchQuery, ...other }) {
    return (
        <TableRow {...other}>
            <TableCell align="center" colSpan={7}>
                <Box sx={{ py: 15, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Not found
                    </Typography>

                    <Typography variant="body2">
                        No results found for $nbsp;
                        <strong>&quot;{searchQuery}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
}