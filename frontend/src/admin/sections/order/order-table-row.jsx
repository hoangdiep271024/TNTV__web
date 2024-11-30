import { Checkbox, IconButton, MenuItem, menuItemClasses, MenuList, Popover, Table, TableCell, TableRow, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from '../../components/iconify'

// delete button handle to delete order
// click order_id to open order details

export function OrderTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                        {row.id}
                    </Typography>
                </TableCell>

                <TableCell>{row.movie_name}</TableCell>
                <TableCell>{row.cinema_name}</TableCell>
                <TableCell>{row.room_name}</TableCell>
                <TableCell>{row.show_date}</TableCell>
                <TableCell>{row.total_price}</TableCell>
                <TableCell>{row.order_date}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>

                <Popover
                    open={Boolean(openPopover)}
                    anchorEl={openPopover}
                    onClose={handleClosePopover}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuList
                        disablePadding
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            width: 140,
                            display: 'flex',
                            flexDirection: 'column',
                            [`& .${menuItemClasses.root}`]: {
                                px: 1,
                                gap: 2,
                                borderRadius: 0.75,
                                [`&. ${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
                            },
                        }}
                    >
                        <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                            Delete
                        </MenuItem>
                    </MenuList>
                </Popover>
            </TableRow>
        </>
    )
}