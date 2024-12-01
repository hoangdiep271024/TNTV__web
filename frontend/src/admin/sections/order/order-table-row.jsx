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
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary' }}>
                        {row.order_id}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.primary' }} noWrap>
                        {row.movie_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {row.cinema_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {row.room_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'medium' }}>
                        {new Date(row.show_date).toLocaleDateString()}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.primary' }} noWrap>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.total_price)}
                    </Typography>
                </TableCell>


                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'medium' }}>
                        {new Date(row.order_date).toLocaleDateString()}
                    </Typography>
                </TableCell>

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