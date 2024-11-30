import { Checkbox, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { Iconify } from '../../components/iconify'

// delete button handle to delete-order
// click order_id to open order details

export function OrderTableRow({ row, selected, onSelectRow }) {

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                        {row.order_id}
                    </Typography>
                </TableCell>

                <TableCell>{row.movie_name}</TableCell>
                <TableCell>{row.cinema_name}</TableCell>
                <TableCell>{row.room_name}</TableCell>
                <TableCell>{row.show_date}</TableCell>
                <TableCell>{row.total_price}</TableCell>
                <TableCell>{row.order_date}</TableCell>

                <TableCell>
                    <IconButton
                        // onClick={handleDelete}
                        sx={{
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}